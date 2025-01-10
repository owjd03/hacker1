const ESGDataStorage = artifacts.require("ESGDataStorage");
const FirmContracts = artifacts.require("FirmContracts");
module.exports = function (deployer) {
    deployer.deploy(ESGDataStorage);
    deployer.deploy(FirmContracts);
};