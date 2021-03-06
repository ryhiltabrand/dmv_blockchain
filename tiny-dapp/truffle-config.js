const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const web3 = require('web3');
//const privateKey = fs.readFileSync(".secret").toString().trim();
//const privateKey = 'ball judge immune spin genre police magnet casino arch staff fog cream'
//const infuraURL = "https://rinkeby.infura.io/v3/3c5398caac6b4679b741751ccbb0d911";

module.exports = {
  //contracts_directory: '../src/eth/contracts',
  contracts_build_directory: '../src/eth/contracts',
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "5777",
    },
  },
  compilers: {
    solc: {
      version: "0.8.9",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};