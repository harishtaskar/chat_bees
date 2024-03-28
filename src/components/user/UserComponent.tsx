import React from "react";
import "./index.scss";
import Image from "next/image";
import Bee from "@/assets/images/bee.png";

type Props = {
  username: string;
  designation: string;
  isActive: boolean;
};

const UserComponent = ({ username, designation, isActive }: Props) => {
  return (
    <div className={`user ${isActive ? "user__active" : ""}`}>
      <Image
        src={Bee}
        width={30}
        height={30}
        alt="user_logo"
        className="user__logo"
      />
      <div className="user__container">
        <span className="user__container__title">{username}</span>
        <span className="user__container__subtitle">{designation}</span>
      </div>
    </div>
  );
};

export default UserComponent;
