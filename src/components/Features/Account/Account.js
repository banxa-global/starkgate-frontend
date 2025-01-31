import PropTypes from 'prop-types';
import React from 'react';

import constants from '../../../config/constants';
import {useCompleteTransferToL1} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {useTransfer} from '../../../providers/TransferProvider';
import {useAccountTransfersLog} from '../../../providers/TransfersLogProvider';
import {useWallets} from '../../../providers/WalletsProvider';
import utils from '../../../utils';
import {
  AccountAddress,
  BackButton,
  LogoutButton,
  Menu,
  MenuTitle,
  TransferLogContainer
} from '../../UI';
import {LinkButton} from '../../UI/LinkButton/LinkButton';
import {TransferLog} from '../TransferLog/TransferLog';
import styles from './Account.module.scss';
import {TITLE_TXT} from './Account.strings';

const {LINKS} = constants;

export const Account = ({transferId}) => {
  const {showTransferMenu} = useMenu();
  const {account, chainId, resetWallet} = useWallets();
  const transfers = useAccountTransfersLog(account);
  const {isL1, isL2, fromNetwork} = useTransfer();
  const completeTransferToL1 = useCompleteTransferToL1();

  const renderTransfers = () => {
    return transfers.length
      ? transfers.map((transfer, index) => (
          <TransferLog
            key={index}
            transfer={transfer}
            onCompleteTransferClick={() => completeTransferToL1(transfer)}
          />
        ))
      : null;
  };

  return (
    <Menu>
      <div className={styles.account}>
        <BackButton onClick={() => showTransferMenu()} />
        <MenuTitle text={TITLE_TXT(fromNetwork.name)} />
        <AccountAddress address={account} />
        {isL1 && (
          <LinkButton
            text={LINKS.ETHERSCAN.text}
            url={LINKS.ETHERSCAN.accountUrl(chainId, account)}
          />
        )}
        {isL2 && (
          <LinkButton text={LINKS.VOYAGER.text} url={LINKS.VOYAGER.accountUrl(chainId, account)} />
        )}
        <TransferLogContainer transferIndex={utils.object.findIndexById(transfers, transferId)}>
          {renderTransfers()}
        </TransferLogContainer>
        <LogoutButton isDisabled={isL2} onClick={resetWallet} />
      </div>
    </Menu>
  );
};

Account.propTypes = {
  transferId: PropTypes.string
};
