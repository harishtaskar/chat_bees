import React from "react";
import Icon, { Props } from "./Icons";

const UserIcon = ({ icon = "icon1", width = 50, height = 50 }: Props) => {
  return (
    <div className="icon">
      <Icon icon={icon} height={height} width={width} key={icon} />
    </div>
  );
};

export default UserIcon;
