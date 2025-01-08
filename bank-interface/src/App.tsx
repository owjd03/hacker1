import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskBars from "./TaskBars";
import Home from "./Home";
import Borrowers from "./Borrowers";

function BankApp() {
  return (
    <div className="content">
      <TaskBars />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/borrowers" element={<Borrowers />} />
      </Routes>
    </div>
  );
}

export default BankApp;