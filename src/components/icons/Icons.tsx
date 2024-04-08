import React from "react";
import ant from "@/assets/icons/ant.png";
import beetle from "@/assets/icons/beetle.png";
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
import spider from "@/assets/icons/spider.png";
import wasp from "@/assets/icons/wasp.png";
import Image from "next/image";
import "./index.scss";

const Insect = [
  ant,
  beetle,
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
];

type Props = {
  insectIndex: number;
};

const UserIcon = ({ insectIndex }: Props) => {
  return (
    <div className="icon">
      <Image
        src={Insect[insectIndex]}
        width={30}
        height={30}
        alt="user_logo"
        className="icon__logo"
      />
    </div>
  );
};

export default UserIcon;
