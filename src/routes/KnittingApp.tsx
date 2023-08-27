import React, { useState } from "react";
import LayoutContainer from "../components/LayoutContainer";
import useLocalState from "../hooks/useLocalState";

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
      <div className="flex flex-col items-center justify-center w-full h-full gap-5">
        <div>how much knit?</div>
        <div>{count}</div>

        <button className="btn btn-accent" onClick={handleClick}>
          increase the KNITSSS
        </button>
        <button className="btn btn-accent" onClick={handleReset}>
          reset the KNITSSS 😿
        </button>
      </div>
    </LayoutContainer>
  );
};
export default KnittingApp;
