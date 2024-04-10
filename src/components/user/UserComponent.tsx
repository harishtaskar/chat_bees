"use client";
import React, { useCallback } from "react";
import "./index.scss";
import UserIcon from "../icons/Icons";
import Badge from "../shared/Badge";
import { useSetRecoilState } from "recoil";
import { modalAtom, userProfileAtom } from "@/state/Atom";

type Props = {
  id: string;
  username: string;
  designation: string;
  iconIndex: number;
  isActive: boolean;
  age: number;
  gender: string;
};

const UserComponent = ({
  id,
  iconIndex,
  username,
  designation,
  age,
  gender,
  isActive,
}: Props) => {
  const setActiveModal = useSetRecoilState(modalAtom);
  const setUserProfileDetails = useSetRecoilState(userProfileAtom);
  const profileClickHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      setActiveModal("user-profile");
      setUserProfileDetails({
        id,
        username,
        designation,
        iconIndex,
        age,
        gender,
      });
    },
    [id, iconIndex, username, designation, age, gender, isActive]
  );

  return (
    <div className={`user ${isActive ? "user__active" : ""}`}>
      <div onClick={profileClickHandler}>
        <UserIcon insectIndex={iconIndex} />
      </div>
      <div className="user__container">
        <div className={"user__container__first"}>
          <span className="user__container__first__title">{username}</span>
          <span className="user__container__first__subtitle">
            {designation}
          </span>
        </div>
        <div className={"user__container__second"}>
          <Badge text={iconIndex} />
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
