import React from "react";
import icon1 from "@/assets/icons/icon1.svg";
import icon2 from "@/assets/icons/icon2.svg";
import icon3 from "@/assets/icons/icon3.svg";
import icon4 from "@/assets/icons/icon4.svg";
import icon5 from "@/assets/icons/icon5.svg";
import icon6 from "@/assets/icons/icon6.svg";
import icon7 from "@/assets/icons/icon7.svg";
import icon8 from "@/assets/icons/icon8.svg";
import icon9 from "@/assets/icons/icon9.svg";
import icon10 from "@/assets/icons/icon10.svg";
import icon11 from "@/assets/icons/icon11.svg";
import icon12 from "@/assets/icons/icon12.svg";
import icon13 from "@/assets/icons/icon13.svg";
import icon14 from "@/assets/icons/icon14.svg";
import icon15 from "@/assets/icons/icon15.svg";
// import icon16 from "@/assets/icons/icon16.svg";
import icon17 from "@/assets/icons/icon17.svg";
import icon18 from "@/assets/icons/icon18.svg";
import icon19 from "@/assets/icons/icon19.svg";
import icon20 from "@/assets/icons/icon20.svg";
import icon21 from "@/assets/icons/icon21.svg";
import icon22 from "@/assets/icons/icon22.svg";
import icon23 from "@/assets/icons/icon23.svg";
import icon24 from "@/assets/icons/icon24.svg";
import icon25 from "@/assets/icons/icon25.svg";
import icon26 from "@/assets/icons/icon26.svg";
import "./index.scss";
import Image from "next/image";

export const Icons = [
  { name: "icon1", icon: icon1 },
  { name: "icon2", icon: icon2 },
  { name: "icon3", icon: icon3 },
  { name: "icon4", icon: icon4 },
  { name: "icon5", icon: icon5 },
  { name: "icon6", icon: icon6 },
  { name: "icon7", icon: icon7 },
  { name: "icon8", icon: icon8 },
  { name: "icon9", icon: icon9 },
  { name: "icon10", icon: icon10 },
  { name: "icon11", icon: icon11 },
  { name: "icon12", icon: icon12 },
  { name: "icon13", icon: icon13 },
  { name: "icon14", icon: icon14 },
  { name: "icon15", icon: icon15 },
  // { name: "icon16", icon: icon16 },
  { name: "icon17", icon: icon17 },
  { name: "icon18", icon: icon18 },
  { name: "icon19", icon: icon19 },
  { name: "icon20", icon: icon20 },
  { name: "icon21", icon: icon21 },
  { name: "icon22", icon: icon22 },
  { name: "icon23", icon: icon23 },
  { name: "icon24", icon: icon24 },
  { name: "icon25", icon: icon25 },
  { name: "icon26", icon: icon26 },
];

export type Props = {
  icon?: string | number;
  width?: number;
  height?: number;
};

const Icon = ({ icon = "icon1", width = 50, height = 50 }: Props) => {
  const currentIcon = Icons?.filter((item) => item.name === icon)[0];
  return (
    <div className="icon">
      <Image
        src={currentIcon?.icon || icon1}
        width={width}
        height={height}
        alt="user_logo"
        className="icon__logo"
      />
    </div>
  );
};

export default Icon;
