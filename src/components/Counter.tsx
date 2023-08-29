import React from "react";
import useLocalState from "../hooks/useLocalState";

const Counter = () => {
  const [count, setCount] = useLocalState("knittingCount", 1);
  const handleIncrease = () => {
    let updatedCount = count + 1;
    setCount(updatedCount);
  };
  const handleDecrease = () => {
    let updatedCount = count - 1;
    setCount(updatedCount);
  };
  const handleReset = () => {
    setCount(1);
  };
  return (
    <div className="flex items-center justify-center gap-5 rounded-xl bg-base-200 p-5">
      {/* <button className="btn btn-error" onClick={handleReset}>
        reset
      </button> */}
      <button className="btn btn-neutral text-2xl" onClick={handleDecrease}>
        -
      </button>
      <div className="text-3xl font-bold">count: {count}</div>
      <button className="btn btn-neutral text-2xl" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
};
export default Counter;
