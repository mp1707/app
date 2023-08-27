import React, { ReactNode, useEffect } from "react";
import { themes } from "./themes";
import { themeChange } from "theme-change";
import StyledLink from "./StyledLink";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required
  }, []);
  
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="navbar bg-base-200 flex justify-between">
        <div className="btn btn-ghost normal-case text-xl">
          <StyledLink to={``} name="Start"/>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 flex items-center gap-3">
            <li>
              <StyledLink to={`chatapp`} name="🧠" />
            </li>
            <li>
              <StyledLink to={`knitting`} name="🧶" />
            </li>
            <li>
              <StyledLink to={`chatrpg`} name="🧙🏽‍♂️" />
            </li>
            <select data-choose-theme className="select select-sm ">
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </ul>
        </div>
      </div>
      <div className="flex flex-1 justify-center h-5/6 w-full my-3 md:w-5/6 lg:w-3/5">
        {children}
      </div>
    </div>
  );
};
export default LayoutContainer;
