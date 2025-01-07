const express = require('express');
const router = express.Router();

// Handle contact form submission
router.post('/submit-contact', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);

    // You can process the data (e.g., save to a database, perform validation)
    res.status(200).send({ message: 'Data received successfully' });
});

module.exports = router;