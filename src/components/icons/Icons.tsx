import React from "react";
import ant from "@/assets/icons/ant.png";
import bugs from "@/assets/icons/bugs.png";
import butterfly from "@/assets/icons/butterfly.png";
import caterpillar from "@/assets/icons/caterpillar.png";
import dragonfly from "@/assets/icons/dragonfly.png";
import earthworm from "@/assets/icons/earthworm.png";
import fly from "@/assets/icons/fly.png";
import grasshopper from "@/assets/icons/grasshopper.png";
import insect from "@/assets/icons/insect.png";
import mantis from "@/assets/icons/mantis.png";
import masquito from "@/assets/icons/mosquito.png";
import masquito1 from "@/assets/icons/mosquito1.png";
import spider from "@/assets/icons/spider.png";
import wasp from "@/assets/icons/wasp.png";
import Image from "next/image";
import cricket from "@/assets/icons/cricket.png";
import ladybug from "@/assets/icons/ladybug.png";
import "./index.scss";

export const Insect = [
  ant,
  bugs,
  butterfly,
  caterpillar,
  dragonfly,
  earthworm,
  fly,
  grasshopper,
  insect,
  mantis,
  masquito,
  spider,
  wasp,
  cricket,
  ladybug,
  masquito1,
];

type Props = {
  insectIndex: number;
  width?: number;
  height?: number;
};

const UserIcon = ({ insectIndex, width = 30, height = 30 }: Props) => {
  return (
    <div className="icon">
      <Image
        src={Insect[insectIndex]}
        width={width}
        height={height}
        alt="user_logo"
        className="icon__logo"
      />
    </div>
  );
};

export default UserIcon;
