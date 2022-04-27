const Migrations = artifacts.require("../src/eth/contracts/Migrations");
console.log(Migrations)

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
