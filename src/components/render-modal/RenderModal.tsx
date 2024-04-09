"use client";
import React, { useCallback } from "react";
import EditProfilePicture from "../profile/EditProfilePicture";
import { useRecoilState } from "recoil";
import { modalAtom } from "@/state/Atom";
import InvalidScreen from "./InvalidScreen";

type Props = {};

const RenderModal = (props: Props) => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const onClose = useCallback(() => {
    setModal("");
  }, []);

  switch (modal) {
    case "edit-profile-picture":
      return <EditProfilePicture onClose={onClose} />;
    case "invalid-device":
      return <InvalidScreen />;

    default:
      return;
  }
};

export default RenderModal;
