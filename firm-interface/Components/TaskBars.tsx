import "./TaskStyle.css";

function TaskBars() {
  return (
    <div className="taskbar">
      <div className="taskbar-right">
        <button className="taskbar-button">Documents</button>
        <button className="taskbar-button">Funds</button>
      </div>
    </div>
  );
}

export default TaskBars;