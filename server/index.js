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
const submitRoutes = require('./routes/submitContact'); // Load routes from 'server/routes'

app.use('/api', submitRoutes); // Prefix API routes with '/api'


//app.use('/api/chatgpt', chatGPTRoutes); // Prefix ChatGPT routes with '/api/chatgpt'

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});