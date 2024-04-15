"use client";
import React, { useCallback } from "react";
import "./index.scss";
import UserIcon from "../icons/Icons";
import Badge from "../shared/Badge";
import { useSetRecoilState } from "recoil";
import { modalAtom, userProfileAtom } from "@/state/Atom";

type Props = {
  user: IUser;
  isActive?: boolean;
};

const UserComponent = ({ user, isActive = false }: Props) => {
  const setActiveModal = useSetRecoilState(modalAtom);
  const setUserProfileDetails = useSetRecoilState(userProfileAtom);
  const profileClickHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      setActiveModal("user-profile");
      setUserProfileDetails(user);
    },
    [user]
  );

  return (
    <div className={`user ${isActive ? "user__active" : ""}`}>
      <div onClick={profileClickHandler}>
        <UserIcon insectIndex={user?.iconIndex || 0} />
      </div>
      <div className="user__container">
        <div className={"user__container__first"}>
          <span className="user__container__first__title">
            {user?.username}
          </span>
          <span className="user__container__first__subtitle">
            {user?.occupation}
          </span>
        </div>
        <div className={"user__container__second"}>
          <Badge text={user?.iconIndex || 1} />
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
