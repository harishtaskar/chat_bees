"use client";
import React, { useMemo } from "react";
import "./index.scss";
import UserIcon from "@/components/icons/UserIcon";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { modalAtom, userAtom } from "@/state/Atom";
import { getUserAge } from "@/utils/DateTime";
import Card from "@/components/shared/Card";
import Theme from "@/components/shared/Theme";

type Props = {};

const Profile = ({}: Props) => {
  const user = useRecoilValue(userAtom);
  const setActiveModal = useSetRecoilState(modalAtom);

  const renderUserProfile = useMemo(() => {
    return (
      <div className="profile__container__body">
        <div className={"profile__container__body__pfp_div"}>
          <UserIcon icon={user?.profileIcon || 0} width={80} height={80} />
          <button
            className={"profile__container__body__pfp_div__edit_btn"}
            onClick={() => setActiveModal("edit-profile-picture")}
          >
            <i className="ri-pencil-line" style={{ color: "var(--white)" }} />
          </button>
        </div>
        <span className={"profile__container__body__title"}>
          {user?.username}
        </span>
        <span className={"profile__container__body__subtitle"}>
          {user?.occupation}
        </span>
        <div className={"profile__container__body__details"}>
          <span className={"profile__container__body__details__text"}>
            {user?.dob ? getUserAge(user?.dob?.toString()) : "XX"}
          </span>
          <span className={"profile__container__body__details__text"}>
            {user?.gender}
          </span>
        </div>
      </div>
    );
  }, [user]);

  const renderEditProfileBtn = useMemo(() => {
    return (
      <div className={"profile__container__button"}>
        <i className="ri-pencil-line" /> Edit Profile
      </div>
    );
  }, []);

  const renderDeactiveProfileBtn = useMemo(() => {
    return (
      <div
        className={"profile__container__button"}
        onClick={() => setActiveModal("delete-profile")}
      >
        <i className="ri-close-circle-line" /> Deactivate Profile
      </div>
    );
  }, []);

  const renderChangePasswordBtn = useMemo(() => {
    return (
      <div className={"profile__container__button"}>
        <i className="ri-lock-line" /> Change Password
      </div>
    );
  }, []);

  const renderChatNotificationBtn = useMemo(() => {
    return (
      <>
        <span className="span">Chat Notifications</span>
        <input
          className="inputCheckBox"
          type="checkbox"
          id="chatnotif"
          onChange={() => {}}
        />
        <label htmlFor="chatnotif" className="labelCheckBox">
          Chat Notification
        </label>
      </>
    );
  }, []);

  const renderThemeBtn = useMemo(() => {
    return (
      <div className="profile_theme">
        <Theme id="theme" />
      </div>
    );
  }, []);

  return (
    <div className="profile">
      <div className={"profile__container"}>
        <Card body={renderUserProfile} />
        <Card
          body={renderEditProfileBtn}
          onClick={() => setActiveModal("update-profile")}
          style={{ cursor: "pointer" }}
        />
        <Card
          body={renderChangePasswordBtn}
          onClick={() => setActiveModal("change-password")}
          style={{ cursor: "pointer" }}
        />
        <Card
          body={renderDeactiveProfileBtn}
          onClick={() => setActiveModal("delete-profile")}
          style={{ cursor: "pointer" }}
        />
        <Card body={renderChatNotificationBtn} />
        <Card body={renderThemeBtn} />
      </div>
    </div>
  );
};

export default Profile;
