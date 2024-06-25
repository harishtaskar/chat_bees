"use client";
import { themeAtom } from "@/state/Atom";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import { useRecoilValue } from "recoil";

const LocalToaster = () => {
  const theme = useRecoilValue(themeAtom);
  const toasterTheme = theme === "dark" ? "colored" : "dark";
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      limit={1}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={toasterTheme}
      transition={Slide}
    />
  );
};

export default LocalToaster;
