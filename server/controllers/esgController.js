require("dotenv").config();
const { JsonRpcProvider, Wallet, Contract } = require("ethers");
const esgDataABI = require('../build/contracts/ESGDataStorage.json').abi;
const contractAddress = process.env.DATA_CONTRACT_ADDRESS;
const provider = new JsonRpcProvider(process.env.GANACHE_RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
const esgDataContract = new Contract(contractAddress, esgDataABI, wallet);
const gasLimit = 500000;
// Store ESG data
const storeESGData = async (req, res) => {
  try {
    const { firmName, date, carbonEmissions, energyEfficiency } = req.body;

    if (!firmName || !date || carbonEmissions === undefined || energyEfficiency === undefined) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const tx = await esgDataContract.updateESGData(firmName, date, carbonEmissions, energyEfficiency,{ gasLimit: gasLimit });
    const receipt = await tx.wait();

    res.status(200).json({ message: `ESG data stored for ${firmName}`, txHash: receipt.transactionHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get ESG data
const getESGData = async (req, res) => {
  try {
    const data = await esgDataContract.getESGData(req.params.firmName);

    res.status(200).json({
      firmName: data.firmName,
      date: data.date.toString(),
      carbonEmissions: data.carbonEmissions.toString(),
      energyEfficiency: data.energyEfficiency.toString(),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { storeESGData, getESGData };