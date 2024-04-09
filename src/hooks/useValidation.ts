"use client";
import { modalAtom } from "@/state/Atom";
import React, { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const useValidation = () => {
  const setActiveModal = useSetRecoilState(modalAtom);

  const deviceValidation = useCallback(() => {
    const width = window.screen.width;
    const height = window.screen.height;
    if (width < 330) {
      setActiveModal("invalid-device");
    } else {
      setActiveModal("");
    }
  }, []);

  return { deviceValidation };
};

export default useValidation;
