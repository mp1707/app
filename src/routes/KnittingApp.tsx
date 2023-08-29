import React from "react";
import LayoutContainer from "../components/LayoutContainer";
import useLocalState from "../hooks/useLocalState";
import { Timer } from "../components/Timer";
import Counter from "../components/Counter";

type Props = {};

// type SecondaryCounter ={
//   {}
// }

const KnittingApp = (props: Props) => {
  // const [secondaryCounters, setSecondaryCounters] = useLocalState<SecondaryCounter>("secondaryCounters",[])


  return (
    <LayoutContainer>
      <div className="flex flex-col items-center justify-center w-full h-full gap-10">
        <Timer />
        <Counter />
        <div className="">
          
        </div>
      </div>
    </LayoutContainer>
  );
};
export default KnittingApp;
