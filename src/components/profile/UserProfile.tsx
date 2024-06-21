"use client";
import React, { useEffect, useMemo } from "react";
import Modal from "../Modals/Modal";
import "./index.scss";
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "@/state/Atom";
import Logo from "../shared/Logo";
import { getUserAge } from "@/utils/DateTime";
import UserIcon from "../icons/UserIcon";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const UserProfile = ({ onClose }: Props) => {
  const userProfile = useRecoilValue(userProfileAtom);
  const renderBody = useMemo(() => {
    return (
      <div className="body">
        <Logo />
        <div className={"body__container"}>
          <div className={"body__container__pfp_div"}>
            <UserIcon
              icon={userProfile?.profileIcon}
              width={120}
              height={120}
            />
          </div>
          <div className={"body__container__details"}>
            <span className={"body__container__details__title"}>
              {userProfile?.username}
            </span>
            <span className={"body__container__details__subtitle"}>
              {userProfile?.occupation}
            </span>
            <div className={"body__container__details__detail"}>
              <span className={"body__container__details__detail__text"}>
                {userProfile?.dob
                  ? getUserAge(userProfile?.dob?.toString())
                  : "XX"}
              </span>
              <span className={"body__container__details__detail__text"}>
                {userProfile?.gender}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }, [userProfile]);

  return (
    <Modal
      body={renderBody}
      onClose={onClose}
      modalstyle={{
        margin: "0px 20px",
        maxWidth: "560px",
        borderRadius: "12px",
      }}
    />
  );
};

export default UserProfile;
