import React from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import Countdown from "react-countdown";
import "../App.css";

const Completionist = () => <span className="end">You are good to go!</span>;

type props = {
  minutes: number;
  seconds: number;
  completed: boolean;
};
const renderer: React.FunctionComponent<props> = ({
  minutes,
  seconds,
  completed,
}) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span className="timer">
        {minutes}:{seconds}
      </span>
    );
  }
};

type Props = {
  remainingTime: number;
};

const renderTime: React.FunctionComponent<Props> = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too late...</div>;
  }

  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

export default function Circle() {
  return (
    <div className="Circle">
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: true, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}
