const { spawn } = require("child_process");

const webScrape = async (req, res) => {
    const { firmName } = req.body; // Get firmName from the body
  
    if (!firmName) {
      return res.status(400).json({ error: "firmName is required" });
    }
  
    // Path to the Python script
    const pythonScript = "./scripts/Handsome_soup.py";
  
    // Spawn the Python process and pass firmName as an argument
    const pythonProcess = spawn("python", [pythonScript, firmName]);
  
    let data = "";
    pythonProcess.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });
  
    pythonProcess.stderr.on("data", (chunk) => {
      console.error(`Error: ${chunk}`);
    });
  
    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(data); // Parse JSON from Python output
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json({ error: "Failed to parse response from scraper" });
        }
      } else {
        res.status(500).json({ error: "Python script execution failed" });
      }
    });
};

module.exports = webScrape;
