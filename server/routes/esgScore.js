const express = require('express');
const router = express.Router();

// ESG Score API
router.post('/', (req, res) => {
    const { companyData } = req.body;

    if (!companyData || !companyData.name) {
        return res.status(400).json({ error: 'Company data is required.' });
    }

    // Simulate ESG score calculation
    const violations = companyData.violations || [];
    const esgScore = Math.max(0, 100 - violations.length * 10); // Deduct 10 points per violation

    res.status(200).json({
        message: 'ESG score calculated successfully.',
        esgScore,
    });
});

module.exports = router;
