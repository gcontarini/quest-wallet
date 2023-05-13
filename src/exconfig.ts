// eslint-disable-next-line import/no-anonymous-default-export
export default {
  enablePasswordEncryption: false,
  showTransactionConfirmationScreen: true,
  factory_address: '0x9406Cc6185a346906296840746125a0E44976454',
  stateVersion: '0.1',
  network: {
    chainID: '5',
    family: 'EVM',
    name: 'Goerli',
    provider: 'https://goerli.blockpi.network/v1/rpc/public',
    entryPointAddress: '0x0576a174D229E3cFA37253523E645A78A0C91B57',
    bundler: 'https://goerli.voltaire.candidewallet.com/rpc',
    baseAsset: {
      symbol: 'ETH',
      name: 'ETH',
      decimals: 18,
      image:
        'https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/6ed5f/eth-diamond-black.webp',
    },
  },
};
