export const formatBalance = balance =>
  typeof balance === 'number' ? parseFloat(balance.toFixed(5)) : 'N/A';

export const shortenAddress = account => {
  if (account) {
    return `${account.substring(0, 5)}...${account.substring(account.length - 3)}`;
  }
  return '';
};

export const watchAsset = async options => {
  try {
    return await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options
      }
    });
  } catch (ex) {
    return false;
  }
};

export const l2_watchAsset = async options => {
  try {
    return await starknet.request({
      type: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options
      }
    });
  } catch (ex) {
    return false;
  }
};
