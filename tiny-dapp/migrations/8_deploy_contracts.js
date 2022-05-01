var contract = artifacts.require("registrationService")


module.exports = function(deployer) {
  deployer.deploy(contract);
};

