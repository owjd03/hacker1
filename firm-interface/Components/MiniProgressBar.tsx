function MiniProgressBar({ percentage }: { percentage: number }) {
  return (
    <div
      style={{
        width: "60%",
        height: "10px",
        backgroundColor: "#ddd",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: "100%",
          backgroundColor: percentage === 100 ? "#4caf50" : "#990011",
          transition: "width 0.5s ease-in-out",
        }}
      ></div>
    </div>
  );
}
export default MiniProgressBar;
