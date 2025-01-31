const strings = {
  containers: {
    header: {
      chain_txt: '{{chainName}} testnet',
      wallet_btn_txt: 'Account | {{address}}'
    },
    footer: {
      rights_txt: '© 2022 StarkWare Industries Ltd. All Rights Reserved'
    }
  },
  menus: {
    back_btn_txt: 'Back',
    login: {
      title_txt: 'Login',
      subtitle_txt: 'Please select {{networkName}} wallet to connect with this dApp:',
      download_txt: ['Don’t have a wallet?', 'Download Here'],
      modal_txt: 'Waiting for confirmation from {{walletName}}',
      unsupported_browser_txt: `Note - The current version of StarkGate (Alpha) doesn't support your browser. Use Chrome to connect.`
    },
    account: {
      title_txt: '{{network}} Account',
      copied_msg_txt: 'Copied!',
      logout_btn_txt: 'Logout',
      transferLogContainer: {
        title_txt: 'Transfers log',
        overview_txt: 'recent transfers',
        empty_msg_txt: 'Transfers will appear here...',
        view_more_txt: 'View more',
        transferLog: {
          complete_transfer_btn_txt: 'Complete transfer'
        }
      }
    },
    selectToken: {
      title_txt: 'Select token from:',
      search_placeholder: 'Token name, symbol, or address'
    },
    transfer: {
      to_txt: 'to',
      from_txt: 'from',
      insufficient_balance_error_msg: 'Insufficient balance',
      max_amount_error_msg:
        'StarkNet Alpha Limitation: transfer to StarkNet limited to {{maxAmount}} {{symbol}}.',
      max_btn_txt: 'Max',
      balance_title_txt: 'Available balance',
      input_placeholder_txt: '0.00',
      transfer_btn_txt: 'Transfer'
    }
  },
  modals: {
    transactionSubmitted: {
      title_txt: 'Transaction sent',
      btn_txt: 'View on {{explorer}}',
      transfer_to_l1_txt:
        'Your transaction is now being processing on L2. When it will be accepted on-chain, we will promote you to complete your transfer.',
      transfer_to_l2_txt: 'Your transaction has been sent to L2!',
      complete_transfer_to_l1_txt: 'Your transaction is completed on L1!',
      status_txt: 'Follow the transaction status on the right side of the browser.'
    },
    transferProgress: {
      approval: {
        type: 'Approval required',
        message: 'Requesting permission to access your {{symbol}} funds.'
      },
      deposit: {
        type: 'Transfer in progress',
        message: 'Transferring {{amount}} {{symbol}} to L2...'
      },
      initiateWithdraw: {
        type: 'Initiate transfer',
        message: 'Initiating transfer of {{amount}} {{symbol}} from L2...'
      },
      waitForAccept: {
        type: 'Transaction sent',
        message: 'Waiting for transaction to be accepted on L2...'
      },
      withdraw: {
        type: 'Transfer in progress',
        message: 'Transferring {{amount}} {{symbol}} to L1...'
      },
      waitForConfirm: {
        type: '{{walletName}}',
        message: 'Waiting for confirmation from {{walletName}}'
      },
      confirm_txt: 'Confirm this transaction in your wallet',
      error_title: 'Transaction error'
    }
  },
  toasts: {
    alpha_disclaimer_msg:
      'This is an ALPHA version of StarkNet, and its Bridge. As such, delays may occur, and catastrophic bugs may lurk. Thanks, OGs, for trying it at this early stage.',
    transfer_log_link: 'View on Transfer Log',
    pendingTransfer: {
      pending_txt: 'Waiting for transaction to be accepted on L2',
      consumed_txt: 'Transaction accepted on L2',
      rejected_txt: 'Transaction rejected on L2'
    },
    completeTransfer: {
      title_txt: 'L2 finished processing your transfer!',
      body_txt:
        'Click on Complete Transfer to transfer the funds from L2 Bridge to your L1 address.',
      dismiss_btn_txt: 'Dismiss',
      complete_transfer_btn_txt: 'Complete Transfer'
    }
  }
};

export default strings;
