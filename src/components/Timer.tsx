import React, { useEffect, useState } from "react";
import useLocalState from "../hooks/useLocalState";

export const Timer = (): React.ReactElement => {
  const [elapsedTime, setElapsedTime] = useLocalState<number>("elapsedTime", 0);
  const [isRunning, setIsRunning] = useLocalState<boolean>(
    "timerRunning",
    false
  );
  interface TimeInterface {
    time: number;
  }
  const [timerHistory, setTimerHistory] = useState<Array<TimeInterface>>([]);

  useEffect(() => {
    if (window.localStorage.getItem("elapsedTime"))
      setElapsedTime(Number(window.localStorage.getItem("elapsedTime")));
    if (window.localStorage.getItem("timerRunning"))
      setIsRunning(
        window.localStorage.getItem("timerRunning") === "false" ? false : true
      );
  }, []);

  const startTimer = () => {
    setIsRunning(true);
  };
  const pauseTimer = () => {
    setIsRunning(false);
  };
  const stopTimer = () => {
    setIsRunning(false);
    setTimerHistory([...timerHistory, { time: elapsedTime }]);
    setElapsedTime(0);
  };

  useEffect(() => {
    let interval;
    if (isRunning === true) {
      interval = setInterval(() => {
        setElapsedTime((seconds) => seconds + 1);
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
      <span className="text-3xl font-bold">{formatSeconds(elapsedTime)}</span>
      <div className="flex gap-3">
        <button className="btn btn-error" onClick={stopTimer}>
          stop
        </button>
        <button
          className={"btn " + (isRunning ? " btn-neutral" : " btn-accent")}
          onClick={isRunning ? pauseTimer : startTimer}
        >
          {isRunning ? "pause" : "start"}
        </button>
      </div>
      {/* <ul className="history">
        {timerHistory.map((timer: any, index: any) => (
          <li key={index}>{timer.time}</li>
        ))}
      </ul> */}
    </div>
  );
};
export default Timer;


