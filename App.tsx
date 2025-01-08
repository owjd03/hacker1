import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FirmApp from "./firm-interface/src/App"; // Adjust the path if needed
import BankApp from "./bank-interface/src/App"; // Adjust the path if needed

function Home() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <nav>
        <Link to="/firm" style={{ margin: "10px", display: "block" }}>
          Go to Firm Interface
        </Link>
        <Link to="/bank" style={{ margin: "10px", display: "block" }}>
          Go to Bank Interface
        </Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/firm/*" element={<FirmApp />} />
        <Route path="/bank/*" element={<BankApp />} />
      </Routes>
    </Router>
  );
}

export default App;
