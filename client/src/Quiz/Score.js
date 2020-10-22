import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CountContext } from "./context/countContext";
import PieChart from "./components/PieChart";

const Score = () => {
  const history = useHistory();
  const { count, score, resetCount, resetScore } = useContext(CountContext);
  return (
    <div>
      <h1>Your Quiz Score</h1>
      <p>
        You answered {score} correctly out of {count} questions total.
      </p>
      <div>
        <PieChart />
      </div>
      <div
        style={{ margin: "10px" }}
        className="ui basic teal button"
        onClick={() => {
          return (history.push("/data"), resetCount(), resetScore())
        }}
      >
        Try Another Quiz!{" "}
      </div>{" "}
    </div>
  );
};

export default Score;
