const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow requests from your frontend (port 5173)
app.use(bodyParser.json()); // Parse JSON data from incoming requests

// Import routes
const moduleRoutes= require('./routes/moduleRoutes'); // Import module routes
const esgRoutes = require('./routes/esgRoutes'); // Import esg routes
const contractRoutes = require('./routes/contractRoutes'); // Import fund routes

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use('/api/modules', moduleRoutes); 
app.use('/api/esgData', esgRoutes);
app.use('/api/contracts', contractRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


