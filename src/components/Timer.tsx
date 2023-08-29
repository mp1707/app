import React, { useEffect, useState } from "react";
import useLocalState from "../hooks/useLocalState";

export const Timer = (): React.ReactElement => {
  const [elapsed, setElapsed] = useLocalState<number>("elapsedKnittingTime", 0);
  const [isRunning, setIsRunning] = useLocalState<boolean>(
    "knittingTimerRunning",
    false
  );
  const [timerHistory, setTimerHistory] = useLocalState<Array<TimeInterface>>(
    "knittingTimerHistory",
    []
  );
  const [elapsedSum, setElapsedSum] = useLocalState<number>(
    "elapsedKnittingTimeSum",
    0
  );

  interface TimeInterface {
    time: number;
  }

  const startTimer = () => {
    setIsRunning(true);
  };
  const pauseTimer = () => {
    setIsRunning(false);
  };
  const stopTimer = () => {
    setIsRunning(false);
    setTimerHistory([...timerHistory, { time: elapsed }]);

    const oldSum = elapsedSum;
    setElapsedSum(oldSum + elapsed);

    setElapsed(0);
  };

  useEffect(() => {
    let interval;
    if (isRunning === true) {
      interval = setInterval(() => {
        setElapsed((seconds) => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  function formatSeconds(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-base-200 p-5">
      <span className="text-xl font-bold">
        session: {formatSeconds(elapsed)}
      </span>
      <span className="text-xl font-bold">
        total: {formatSeconds(elapsedSum)}
      </span>
      <div className="flex gap-3">
        <button className="btn btn-sm btn-error" onClick={stopTimer}>
          stop
        </button>
        <button
          className={"btn btn-sm " + (isRunning ? " btn-neutral" : " btn-accent")}
          onClick={isRunning ? pauseTimer : startTimer}
        >
          {isRunning ? "pause" : "start"}
        </button>
      </div>
    </div>

  );
};

export default Timer;





