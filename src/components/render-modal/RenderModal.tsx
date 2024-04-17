"use client";
import React, { useCallback } from "react";
import EditProfilePicture from "../profile/EditProfilePicture";
import { useRecoilState } from "recoil";
import { modalAtom } from "@/state/Atom";
import InvalidScreen from "./InvalidScreen";
import UpdateProfile from "../profile/UpdateProfile";
import UserProfile from "../profile/UserProfile";
import ChangePassword from "../profile/ChangePassword";
import SearchUser from "../search-user/SearchUser";
import DeleteProfile from "../profile/DeleteProfile";

type Props = {};

const RenderModal = (props: Props) => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const onClose = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      setModal("");
    },
    []
  );

  switch (modal) {
    case "user-profile":
      return <UserProfile onClose={onClose} />;
    case "edit-profile-picture":
      return <EditProfilePicture onClose={onClose} />;
    case "update-profile":
      return <UpdateProfile onClose={onClose} />;
    case "change-password":
      return <ChangePassword onClose={onClose} />;
    case "delete-profile":
      return <DeleteProfile onClose={onClose} />;
    case "search-user":
      return <SearchUser onClose={onClose} />;
    case "invalid-device":
      return <InvalidScreen />;

    default:
      return;
  }
};

export default RenderModal;
