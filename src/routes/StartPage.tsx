import React from "react";
import { Link } from "react-router-dom";
import LayoutContainer from "../components/LayoutContainer";

type Props = {};

const StartPage = (props: Props) => {
  return (
    <LayoutContainer>
      <div className="flex justify-center items-center">
        <Link className="btn btn-neutral" to={`/ChatApp`}>
          myGPT 🦾
        </Link>
      </div>
    </LayoutContainer>
  );
};
export default StartPage;
