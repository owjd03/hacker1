import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./styles.css";

export interface Props {
  current: number;
  target: number;
}
function CircularProgress({ current, target }: Props) {
  const percentage = (current / target) * 100;

  return (
    <div className="progress-container">
      <CircularProgressbar
        value={percentage}
        text={`${current}/${target}`}
        styles={buildStyles({
          pathColor: "#4caf50",
          trailColor: "#d6d6d6",
        })}
      />
    </div>
  );
}

export default CircularProgress;
