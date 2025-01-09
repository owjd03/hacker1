const ESGDataStorage = artifacts.require("ESGDataStorage");

module.exports = function (deployer) {
    deployer.deploy(ESGDataStorage);
};