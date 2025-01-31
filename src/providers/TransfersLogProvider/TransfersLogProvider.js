import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import constants from '../../config/constants';
import {isCompleted} from '../../enums';
import {useLogger} from '../../hooks';
import {starknet} from '../../libs';
import utils from '../../utils';
import {useBlockHash} from '../BlockHashProvider';
import {TransfersLogContext} from './transfers-log-context';
import {actions, initialState, reducer} from './transfers-log-reducer';

const {LOCAL_STORAGE_TRANSFERS_KEY} = constants;

export const TransfersLogProvider = ({children}) => {
  const logger = useLogger(TransfersLogProvider.displayName);
  const [transfers, dispatch] = useReducer(reducer, initialState);
  const blockHash = useBlockHash();

  useEffect(() => {
    const storedTransfers = utils.storage.getItem(LOCAL_STORAGE_TRANSFERS_KEY);
    if (Array.isArray(storedTransfers)) {
      setTransfers(storedTransfers);
    }
  }, []);

  useDeepCompareEffect(() => {
    const updateTransfers = async () => {
      logger.log(`Update transfers`);
      if (!blockHash) {
        return;
      }
      const checkTransaction = async transfer => {
        if (isCompleted(transfer.status) || transfer.lastChecked === blockHash) {
          return transfer;
        }
        try {
          logger.log(`Checking tx status ${transfer.l2hash}`);
          const newStatus = await starknet.defaultProvider.getTransactionStatus(transfer.l2hash);
          if (transfer.status !== newStatus.tx_status) {
            logger.log(
              !transfer.status
                ? `New status ${newStatus.tx_status}`
                : `Status changed from ${transfer.status}->${newStatus.tx_status}`
            );
          }
          return {
            ...transfer,
            status: newStatus.tx_status,
            lastChecked: blockHash
          };
        } catch (error) {
          logger.error(`Failed to check transaction status: ${transfer.l2hash}`);
        }
        return transfer;
      };

      const newTransfers = [];
      for (const transfer of transfers) {
        const newTransfer = await checkTransaction(transfer);
        newTransfers.push(newTransfer);
      }
      logger.log(`Done update transfers`, {newTransfers});
      if (newTransfers.length) {
        setTransfers(newTransfers);
        utils.storage.setItem(LOCAL_STORAGE_TRANSFERS_KEY, newTransfers);
      }
    };
    updateTransfers();
  }, [blockHash, transfers]);

  const addTransfer = payload => {
    dispatch({
      type: actions.ADD_TRANSFER,
      payload
    });
  };

  const setTransfers = payload => {
    dispatch({
      type: actions.SET_TRANSFERS,
      payload
    });
  };

  const context = {
    transfers,
    addTransfer
  };

  return <TransfersLogContext.Provider value={context}>{children}</TransfersLogContext.Provider>;
};

TransfersLogProvider.displayName = 'TransfersLogProvider';

TransfersLogProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
