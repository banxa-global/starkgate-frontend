import PropTypes from 'prop-types';
import React, {useEffect, useReducer, useRef} from 'react';

import {useIsL1} from '../../components/Features/Transfer/Transfer.hooks';
import {LOCAL_STORAGE_REGISTERED_ASSETS_KEY} from '../../constants';
import {useConfig, useLogger} from '../../hooks';
import {useL1TokenBalance, useL2TokenBalance} from '../../hooks/useTokenBalance';
import {StorageManager} from '../../services';
import {isEth, l2_watchAsset, watchAsset} from '../../utils';
import {useL1Wallet, useL2Wallet, useWallets} from '../WalletsProvider';
import {TokensContext} from './tokens-context';
import {actions, initialState, reducer} from './tokens-reducer';

export const TokensProvider = ({children}) => {
  const {pollBalanceInterval} = useConfig();
  const logger = useLogger(TokensProvider.displayName);
  const [tokens, dispatch] = useReducer(reducer, initialState);
  const [isL1] = useIsL1();
  const {chainId} = useWallets();
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account} = useL2Wallet();
  const registeredTokens = useRef([]);
  const getL1TokenBalance = useL1TokenBalance(l1Account);
  const getL2TokenBalance = useL2TokenBalance(l2Account);

  useEffect(() => {
    registeredTokens.current = StorageManager.getItem(LOCAL_STORAGE_REGISTERED_ASSETS_KEY) || [];
  }, []);

  useEffect(() => {
    updateTokens();
    const intervalId = setInterval(() => {
      updateTokens();
    }, pollBalanceInterval);
    return () => clearInterval(intervalId);
  }, [pollBalanceInterval]);

  const updateTokens = () => {
    logger.log(`It's time to update tokens balances!`);
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index];
      if (token.isLoading) {
        logger.log('Token already loading, skip balance update');
        break;
      }
      logger.log(`Update balance for token ${token.symbol}`, {token});
      if (!('balance' in token)) {
        updateTokenState(index, {isLoading: true});
      } else {
        logger.log(`Token already have a balance of ${token.balance}, don't set isLoading prop`);
      }
      const getBalance = token.isL1 ? getL1TokenBalance : getL2TokenBalance;
      getBalance(token)
        .then(balance => {
          logger.log(`New ${token.symbol} token balance is ${balance}`);
          updateTokenState(index, {balance, isLoading: false});
        })
        .catch(ex => {
          logger.error(`Failed to fetch token ${token.symbol} balance: ${ex.message}`, {ex});
          updateTokenState(index, {balance: null, isLoading: false});
        });
    }
  };

  const addToken = async tokenData => {
    if (!tokenData || (isL1 && isEth(tokenData))) return;
    const {tokenAddress, symbol} = tokenData;
    if (!isTokenAdded(symbol)) {
      const options = {address: tokenAddress[chainId], ...tokenData};
      const wasAdded = await (isL1 ? watchAsset(options) : l2_watchAsset(options));
      if (wasAdded) {
        registeredTokens.current = [...registeredTokens.current, symbol];
        StorageManager.setItem(LOCAL_STORAGE_REGISTERED_ASSETS_KEY, registeredTokens.current);
      }
    }
  };

  const isTokenAdded = symbol => {
    return registeredTokens.current.includes(symbol);
  };

  const updateTokenState = (index, args) => {
    dispatch({
      type: actions.UPDATE_TOKEN_STATE,
      payload: {
        index,
        args
      }
    });
  };

  const context = {
    tokens,
    addToken,
    updateTokens
  };

  return <TokensContext.Provider value={context}>{children}</TokensContext.Provider>;
};

TokensProvider.displayName = 'TokensProvider';

TokensProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
