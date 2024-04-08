import React from "react";
import "./index.scss";
import UserIcon from "../icons/Icons";
import Badge from "../shared/Badge";

type Props = {
  username: string;
  designation: string;
  iconIndex: number;
  isActive: boolean;
};

const UserComponent = ({
  iconIndex,
  username,
  designation,
  isActive,
}: Props) => {
  return (
    <div className={`user ${isActive ? "user__active" : ""}`}>
      <UserIcon insectIndex={iconIndex} />
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
