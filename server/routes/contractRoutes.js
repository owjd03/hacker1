const express = require('express');
const {
    addContract,
    updateProgress,
    getContract,
}  = require('../controllers/contractsController');
const router = express.Router();

// Route to create a new contract for a firm
router.post("/", addContract);

// Route to get contract details for a firm
router.get("/:firmName", getContract);

// Route to update progress of a contract item for a firm
router.post("/:firmName/update", updateProgress);


module.exports = router;
