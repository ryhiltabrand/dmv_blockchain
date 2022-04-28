const Contacts = artifacts.require("Service");


module.exports = function(deployer) {
  deployer.deploy(Contacts);
};