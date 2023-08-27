import React from "react";
import { Link } from "react-router-dom";
import LayoutContainer from "../components/LayoutContainer";

type Props = {};

const StartPage = (props: Props) => {
  return (
    <LayoutContainer>
      <div className="flex justify-center items-center gap-3">
        <Link className="btn btn-accent" to={`/ChatApp`}>
          myGPT 
        </Link>
        <Link className="btn btn-accent" to={`/knitting`}>
          knitting App
        </Link>
      </div>
    </LayoutContainer>
  );
};
export default StartPage;
