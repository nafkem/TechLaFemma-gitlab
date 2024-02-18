
require('@nomicfoundation/hardhat-toolbox');
require("dotenv").config({ path: ".env" });

module.exports = {
  solidity: {
    version: '0.8.17',
  },
  networks: {
    // for testnet
    'lightlink-testnet': {
      url: 'https://replicator.pegasus.lightlink.io/rpc/v1',
      accounts: [process.env.PRIVATE_KEY],
      //gasPrice: 1000000000,
    },
    },
};
