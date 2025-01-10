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
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/firm/*" element={<FirmApp />} />
        <Route path="/bank/*" element={<BankApp />} />
      </Routes>
    </Router>
  );
};

export default App;
