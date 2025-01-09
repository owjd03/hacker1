import { useNavigate } from "react-router-dom";
import "./TaskStyle.css";

function TaskBars() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="taskbar">
      <div className="taskbar-right">
        <button
          className="taskbar-button"
          onClick={() => handleNavigation("/firm/documents")}
        >
          Documents
        </button>
        <button
          className="taskbar-button"
          onClick={() => handleNavigation("/firm/funds")}
        >
          Funds
        </button>
      </div>
    </div>
  );
}

export default TaskBars;
