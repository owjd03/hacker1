const express = require('express');
const { storeESGData, getESGData } = require('../controllers/esgController');
const router = express.Router();

// POST route to store ESG data
router.post('/', storeESGData);

// GET route to retrieve ESG data by index
router.get('/:firmName', getESGData);

module.exports = router;
