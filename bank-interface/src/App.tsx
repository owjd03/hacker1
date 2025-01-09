import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskBars from "./TaskBars";
import Home from "./Home";
import Borrowers from "./Borrowers";
import Contract from "./contract";

function BankApp() {
  return (
    <div className="content">
      <TaskBars />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="borrowers" element={<Borrowers />} />
        <Route path="/contract" element={<Contract />} />
      </Routes>
    </div>
  );
}

export default BankApp;