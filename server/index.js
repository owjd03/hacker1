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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
const submitRoutes = require('./routes/submitContact'); // Load routes from 'server/routes'
app.use('/api', submitRoutes); // Prefix API routes with '/api'
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
const moduleRoutes= require('./routes/moduleRoutes'); // Import module routes
// const chatGPTRoutes = require('./routes/chatGPT.js'); // Import ChatGPT routes
const esgRoutes = require('./routes/esgRoutes'); // Import esg routes
const fundRoutes = require('./routes/fundRoutes'); // Import fund routes

app.use('/api/esgData', esgRoutes);
app.use('/api/moduleRoutes', moduleRoutes); 
// app.use('/api/fundRoutes', fundRoutes);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


