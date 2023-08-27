import React, { ReactNode, useEffect } from "react";
import { themes } from "./themes";
import { themeChange } from "theme-change";
import StyledLink from "./StyledLink";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen">
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Logo?</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 flex items-center gap-3">
            <li className="grow-2">
              <StyledLink to={``} name="Start Page" />
            </li>
            <li className="grow-2">
              <StyledLink to={`chatapp`} name="myGPT 🦾" />
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
      <div className="flex justify-center flex-1 w-full my-3 md:w-5/6 lg:w-3/5"> {children}</div>
    </div>
  );
};
export default LayoutContainer;
