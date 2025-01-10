const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow requests from your frontend (port 5173)
app.use(bodyParser.json()); // Parse JSON data from incoming requests

//CAN CHANGE LOCATION, for LOGIN 
app.post("/login", (req, res) => {
    const { type, username, password } = req.body;
  
    console.log("Received Data:", { type, username, password });
  
    // Simulate a successful response
    res.status(200).json({
      message: "Login successful",
      received: { type, username, password },
    });
  });
  

  
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



//app.use('/api/chatgpt', chatGPTRoutes); // Prefix ChatGPT routes with '/api/chatgpt'

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});