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
      <div className="navbar bg-base-100 py-0">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">🚀</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal gap-1 ">
            <li>
              <StyledLink to={`settings`} name="⚙️" />
            </li>
            <li>
              <details>
                <summary>Apps</summary>
                <ul className="p-2 bg-base-100 right-0 flex flex-col gap-2">
                  <li>
                    <StyledLink to={`chatapp`} name="GPT" />
                  </li>
                  <li>
                    <StyledLink to={`knitting`} name="Knitting" />
                  </li>
                  <li>
                    <StyledLink to={`chatrpg`} name="chatRPG" />
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center h-5/6 w-full md:mb-3  md:w-5/6 lg:w-3/5">
        {children}
      </div>
    </div>
  );
};
export default LayoutContainer;
