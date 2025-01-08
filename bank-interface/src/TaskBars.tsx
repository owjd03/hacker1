import { Link } from "react-router-dom";
import "./Taskbars.css";

function TaskBars() {
  return (
    <div className="taskbar">
      <div className="right-taskbar">
        <Link to="/bank" className="taskbar-button">
          Home
        </Link>
        <Link to="/bank/borrowers" className="taskbar-button">
          Borrowers
        </Link>
      </div>
    </div>
  );
}

export default TaskBars;
