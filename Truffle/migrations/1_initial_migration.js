const Migrations = artifacts.require("Admin");
const supplier = artifacts.require("chain");
const damage = artifacts.require("Damage");


module.exports = function(deployer) {
  deployer.deploy(Migrations,"admin",123,12345);
  deployer.deploy(supplier);
  deployer.deploy(damage);

};
