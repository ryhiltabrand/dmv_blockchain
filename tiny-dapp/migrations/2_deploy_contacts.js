const Contacts = artifacts.require("../src/eth/contracts/Service.sol");


module.exports = function(deployer) {
  deployer.deploy(Contacts);
};