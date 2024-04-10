"use client";
import { modalAtom } from "@/state/Atom";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

type Props = {};

const ValidateDevice = (props: Props) => {
  const setActiveModal = useSetRecoilState(modalAtom);

  const [windowSize, setwindowSize] = useState({
    width: global.window?.screen.width,
    height: global.window?.screen.height,
  });

  useEffect(() => {
    const handleResize = () => {
      setwindowSize({
        width: global.window?.screen.width,
        height: global.window?.screen.height,
      });
    };

    global.window?.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      global.window?.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(windowSize);

  useEffect(() => {
    if (windowSize.width < 330 || windowSize.height < 580) {
      setActiveModal("invalid-device");
    } else {
      setActiveModal("");
    }
  }, [windowSize]);
  return <></>;
};

export default ValidateDevice;
