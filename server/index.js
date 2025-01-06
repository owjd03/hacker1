const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const complianceRoutes = require('./routes/compliance');
const esgScoreRoutes = require('./routes/esgScore');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use('/api/compliance', complianceRoutes);
app.use('/api/esg-score', esgScoreRoutes);
app.use('/api/upload', uploadRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});