import React from "react";
import icon1 from "@/assets/icons/icon1.png";
import icon2 from "@/assets/icons/icon2.png";
import icon3 from "@/assets/icons/icon3.png";
import icon4 from "@/assets/icons/icon4.png";
import icon5 from "@/assets/icons/icon5.png";
import icon6 from "@/assets/icons/icon6.png";
import icon7 from "@/assets/icons/icon7.png";
import icon8 from "@/assets/icons/icon8.png";
import icon9 from "@/assets/icons/icon9.png";
import icon10 from "@/assets/icons/icon10.png";
import icon11 from "@/assets/icons/icon11.png";
import icon12 from "@/assets/icons/icon12.png";
import icon13 from "@/assets/icons/icon13.png";
import icon14 from "@/assets/icons/icon14.png";
import icon15 from "@/assets/icons/icon15.png";
import icon16 from "@/assets/icons/icon16.png";
import icon17 from "@/assets/icons/icon17.png";
import icon18 from "@/assets/icons/icon18.png";
import icon19 from "@/assets/icons/icon19.png";
import icon20 from "@/assets/icons/icon20.png";
import icon21 from "@/assets/icons/icon21.png";
import icon22 from "@/assets/icons/icon22.png";
import icon23 from "@/assets/icons/icon23.png";
import icon24 from "@/assets/icons/icon24.png";
import icon25 from "@/assets/icons/icon25.png";
import icon26 from "@/assets/icons/icon26.png";
import icon27 from "@/assets/icons/icon27.png";
import icon28 from "@/assets/icons/icon28.png";
import icon29 from "@/assets/icons/icon29.png";
import icon30 from "@/assets/icons/icon30.png";
import icon31 from "@/assets/icons/icon31.png";
import icon32 from "@/assets/icons/icon32.png";
import icon33 from "@/assets/icons/icon33.png";
import icon34 from "@/assets/icons/icon34.png";
import icon35 from "@/assets/icons/icon35.png";
import icon36 from "@/assets/icons/icon36.png";
import icon37 from "@/assets/icons/icon37.png";
import icon38 from "@/assets/icons/icon38.png";
import icon39 from "@/assets/icons/icon39.png";
import icon40 from "@/assets/icons/icon40.png";
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
  { name: "icon16", icon: icon16 },
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
  { name: "icon27", icon: icon27 },
  { name: "icon28", icon: icon28 },
  { name: "icon29", icon: icon29 },
  { name: "icon30", icon: icon30 },
  { name: "icon31", icon: icon31 },
  { name: "icon32", icon: icon32 },
  { name: "icon33", icon: icon33 },
  { name: "icon34", icon: icon34 },
  { name: "icon35", icon: icon35 },
  { name: "icon36", icon: icon36 },
  { name: "icon37", icon: icon37 },
  { name: "icon38", icon: icon38 },
  { name: "icon39", icon: icon39 },
  { name: "icon40", icon: icon40 },
];

export type Props = {
  icon?: string | number;
  width?: number;
  height?: number;
};

const Icon = ({ icon = "icon1", width = 50, height = 50 }: Props) => {
  const currentIcon = Icons?.filter((item) => item.name === icon)[0] || icon1;
  return (
    <div className="icon">
      <Image
        src={currentIcon.icon}
        width={width}
        height={height}
        alt="user_logo"
        className="icon__logo"
      />
    </div>
  );
};

export default Icon;
