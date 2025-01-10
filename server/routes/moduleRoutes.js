const express = require('express');
const  aiEval  = require('../controllers/aiController');
const  webScrape  = require('../controllers/webScrapeController');
const router = express.Router();

router.post('/ai/', aiEval);
router.post('/webscrape/', webScrape);
//esg score tabulation

module.exports = router;
