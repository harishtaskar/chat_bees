"use client";
import React, { useEffect } from "react";
import "./index.scss";
import UserIcon from "@/components/icons/UserIcon";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { modalAtom, userAtom } from "@/state/Atom";

type Props = {};

const Profile = ({}: Props) => {
  const user = useRecoilValue(userAtom);
  const setActiveModal = useSetRecoilState(modalAtom);

  return (
    <div className="profile">
      <div className={"profile__container"}>
        <div className={"profile__container__pfp_div"}>
          <UserIcon icon={user?.profileicon || 0} width={80} height={80} />
          <button
            className={"profile__container__pfp_div__edit_btn"}
            onClick={() => setActiveModal("edit-profile-picture")}
          >
            <i className="ri-pencil-line" />
          </button>
        </div>
        <span className={"profile__container__title"}>{user?.username}</span>
        <span className={"profile__container__subtitle"}>
          {user?.occupation}
        </span>
        <div className={"profile__container__details"}>
          <span className={"profile__container__details__text"}>
            {user?.dob?.toString()}
          </span>
          <span className={"profile__container__details__text"}>
            {user?.gender}
          </span>
        </div>
        <button
          className={"profile__container__btn"}
          onClick={() => setActiveModal("update-profile")}
        >
          {" "}
          <i className="ri-pencil-fill" /> Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
