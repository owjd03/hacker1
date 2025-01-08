import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./src/components/Login";
import FirmApp from "./firm-interface/src/App";
import BankApp from "./bank-interface/src/App";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect the root path "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Show Login Page */}
        <Route path="/login" element={<Login />} />
        {/* Show FirmApp when path is /firm */}
        <Route path="/firm" element={<FirmApp />} />
        {/* Show BankApp when path is /bank */}
        <Route path="/bank/*" element={<BankApp />} />
      </Routes>
    </Router>
  );
};

export default App;
