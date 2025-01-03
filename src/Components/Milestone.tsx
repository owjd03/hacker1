import "./Milestone.css";

function Milestone() {
  const data = [
    { paidOut: "$300k", date: "31/12/24", action: "Hit milestone of building 300 solar panels. Great work!" },
    { paidOut: "$150k", date: "30/06/24", action: "Achieved 150 solar panels. Keep it up!" },
  ];

  return (
    <div className="milestones-container">
      <h1 className="milestones-title">Milestones</h1>
      <table className="milestones-table">
        <thead>
          <tr>
            <th>Paid Out</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.paidOut}</td>
              <td>{row.date}</td>
              <td>{row.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Milestone;