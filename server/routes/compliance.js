const express = require('express');
const router = express.Router();

// Compliance Check API
router.post('/check', (req, res) => {
    const { borrowerData, documents } = req.body;

    if (!borrowerData || !documents) {
        return res.status(400).json({ error: 'Borrower data or documents missing.' });
    }

    // Simulate compliance check logic
    const isCompliant = documents.some(doc => doc.title.includes('Environment'));

    res.status(200).json({
        message: 'Compliance check completed.',
        complianceResult: isCompliant,
    });
});

module.exports = router;