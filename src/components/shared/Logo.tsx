import React, { CSSProperties } from "react";
import "./index.scss";
import Bee from "@/assets/images/bee.png";
import Image from "next/image";

type Props = {
  style?: CSSProperties;
};

const Logo = ({ style }: Props) => {
  return (
    <div style={style} className="logo">
      <Image
        src={Bee}
        className="logo__bee_logo"
        alt="bee_logo"
        width={40}
        height={40}
      />
      Chat <span className="logo__bees">bees</span>
    </div>
  );
};

export default Logo;
