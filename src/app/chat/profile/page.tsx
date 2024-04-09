"use client";
import React, { useState } from "react";
import "./index.scss";
import UserIcon from "@/components/icons/Icons";
import { useSetRecoilState } from "recoil";
import { modalAtom } from "@/state/Atom";

type Props = {};

const Profile = ({}: Props) => {
  const setActiveModal = useSetRecoilState(modalAtom);
  return (
    <div className="profile">
      <div className={"profile__container"}>
        <div className={"profile__container__pfp_div"}>
          <UserIcon insectIndex={5} width={80} height={80} />
          <button
            className={"profile__container__pfp_div__edit_btn"}
            onClick={() => setActiveModal("edit-profile-picture")}
          >
            <i className="ri-pencil-line" />
          </button>
        </div>
        <span className={"profile__container__title"}>Harry_Potter</span>
        <span className={"profile__container__subtitle"}>web Developer</span>
        <div className={"profile__container__details"}>
          <span className={"profile__container__details__text"}>22</span>
          <span className={"profile__container__details__text"}>male</span>
        </div>
        <button className={"profile__container__btn"}>
          {" "}
          <i className="ri-pencil-fill" /> Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
