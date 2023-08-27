import React from "react";
import LayoutContainer from "../components/LayoutContainer";
import useLocalState from "../hooks/useLocalState";
import { Timer } from "../components/Timer";

type Props = {};

const KnittingApp = (props: Props) => {
  const [count, setCount] = useLocalState("knittingCount", 1);
  const handleClick = () => {
    let updatedCount = count + 1;
    setCount(updatedCount);
  };
  const handleReset = () => {
    setCount(1);
  };

  return (
    <LayoutContainer>
      <div className="flex flex-col items-center justify-center w-full h-full gap-10">
        <Timer />
        <div className="flex items-center justify-center gap-5 rounded-xl bg-base-200 p-5">
          <button className="btn btn-error" onClick={handleReset}>
            reset
          </button>
          <div className="text-3xl font-bold">count: {count}</div>

          <button className="btn btn-neutral text-2xl" onClick={handleClick}>
          ✚
          </button>
        </div>
      </div>
    </LayoutContainer>
  );
};
export default KnittingApp;
