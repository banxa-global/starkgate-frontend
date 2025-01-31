import {useCallback, useContext} from 'react';

import {ModalType} from '../../components/UI/Modal/Modal/Modal.constants';
import utils from '../../utils';
import {ModalContext} from './modal-context';

export const useModal = () => {
  return {
    ...useContext(ModalContext)
  };
};

export const useHideModal = () => {
  const {hideModal} = useContext(ModalContext);

  return useCallback(() => {
    hideModal();
  }, [hideModal]);
};

export const useProgressModal = () => {
  const {showModal} = useContext(ModalContext);

  return useCallback(
    (title, message, type = ModalType.INFO) => {
      showModal({
        componentPath: 'UI/Modal/ProgressModal/ProgressModal',
        componentProps: {
          message
        },
        title,
        type
      });
    },
    [showModal]
  );
};

export const useTransactionSubmittedModal = () => {
  const {showModal} = useContext(ModalContext);

  return useCallback(
    transfer => {
      showModal({
        componentPath: 'UI/Modal/TransactionSubmittedModal/TransactionSubmittedModal',
        componentProps: {
          transfer
        },
        title: utils.getTranslation('modals.transactionSubmitted.title_txt'),
        isClosable: true
      });
    },
    [showModal]
  );
};

export const useErrorModal = () => {
  const {showModal} = useContext(ModalContext);

  return useCallback(
    (title, body) => {
      showModal({
        title,
        body,
        isClosable: true,
        type: ModalType.ERROR
      });
    },
    [showModal]
  );
};
