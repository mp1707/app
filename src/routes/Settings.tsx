import React, { useEffect } from "react";
import LayoutContainer from "../components/LayoutContainer";
import { themeChange } from "theme-change";
import { themes } from "../components/themes";

const Settings = () => {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required
  }, []);

  return (
    <LayoutContainer>
      <div className=" flex flex-col bg-base-300 rounded-md items-center justify-center w-1/2 h-1/2 gap-1">
        <label className="label">
          <span className="label-text">Pick your theme</span>
        </label>
        <select data-choose-theme className="select select-bordered">
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
    </LayoutContainer>
  );
};
export default Settings;
