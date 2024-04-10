"use client";
import React, { useMemo } from "react";
import Modal from "../Modals/Modal";
import "./index.scss";
import UserIcon from "../icons/Icons";
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "@/state/Atom";
import Logo from "../shared/Logo";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const UserProfile = ({ onClose }: Props) => {
  const userProfile: IUser = useRecoilValue(userProfileAtom);
  const renderBody = useMemo(() => {
    return (
      <div className="body">
        <Logo />
        <div className={"body__container"}>
          <div className={"body__container__pfp_div"}>
            <UserIcon
              insectIndex={userProfile.iconIndex}
              width={80}
              height={80}
            />
          </div>
          <div className={"body__container__details"}>
            <span className={"body__container__details__title"}>
              {userProfile.username}
            </span>
            <span className={"body__container__details__subtitle"}>
              {userProfile.designation}
            </span>
            <div className={"body__container__details__detail"}>
              <span className={"body__container__details__detail__text"}>
                {userProfile.age}
              </span>
              <span className={"body__container__details__detail__text"}>
                {userProfile.gender}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <Modal
      body={renderBody}
      onClose={onClose}
      modalstyle={{ margin: "0px 20px", maxWidth: "560px" }}
    />
  );
};

export default UserProfile;
