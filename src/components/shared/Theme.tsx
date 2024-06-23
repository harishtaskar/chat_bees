"use client";
import useNetwork from "@/hooks/useNetwork";
import { userAtom } from "@/state/Atom";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

type Props = {
  id?: string;
};

const Theme = ({ id = "theme" }: Props) => {
  const setUser = useSetRecoilState(userAtom);
  const user = useRecoilValue(userAtom);
  const [darkmode, setDarkmode] = useState(
    user?.theme === "dark" ? true : false
  );

  const { patchRequest } = useNetwork();

  const onThemeChangeHandler = useCallback(
    (event: any) => {
      const updateProfile = async () => {
        const response = await patchRequest("/user/update", {
          update: { theme: !darkmode ? "dark" : "light" },
        });
        if (response?.res === "ok") {
          setDarkmode(!darkmode);
          setUser(response.user);
        }
      };
      updateProfile();
    },
    [darkmode]
  );

  //Changing Theme
  useEffect(() => {
    const headTag = document.getElementsByTagName("head")[0];
    if (darkmode) {
      const styleTag = document.createElement("style");
      styleTag.id = "styleID";

      styleTag.innerHTML = `
      :root body{
        --text-color: #fdfdfd;
        --background: #1e1e1e;
        --background2: #252526;
        --background3: #333333;
        --white: #000000;
        --muted-border: #FFFFFF40;
        --muted-border2: #414141c9;
        --text-color-2: #c5c5c5;
        --light-gray-1: #3a3a3a;
        --second-text-color: #c7c7c7;
        --second-border-color: #616161;
        --active-li: rgba(255, 255, 255, 0.15);
        --skeleton: #e2e5e753;
      }`;
      const prevstyleTag = document.getElementById("styleID");
      if (!prevstyleTag) {
        headTag.appendChild(styleTag);
      }
    } else {
      const styleTag = document.getElementById("styleID");
      if (styleTag) {
        headTag.removeChild(styleTag);
      }
    }
  }, [darkmode]);

  return (
    <>
      <span className="text span">Dark Mode</span>
      <input
        className="inputCheckBox "
        type="checkbox"
        id={id}
        checked={darkmode}
        onChange={onThemeChangeHandler}
      />
      <label htmlFor={id} className="labelCheckBox">
        Dark Mode
      </label>
    </>
  );
};

export default Theme;
