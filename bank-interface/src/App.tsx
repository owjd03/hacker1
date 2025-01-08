import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskBars from "./TaskBars";
import Home from "./Home";
import Borrowers from "./Borrowers";
import "./App.css";

function App() {
  return (
    <Router>
      <TaskBars />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/borrowers" element={<Borrowers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
