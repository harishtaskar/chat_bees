import React, { CSSProperties } from "react";
import "./index.scss";
import Bee from "@/assets/images/bee.png";
import Image from "next/image";

type Props = {
  style?: CSSProperties;
  image?: boolean;
};

const Logo = ({ style, image=true }: Props) => {
  return (
    <div style={style} className="logo">
      {image && (<Image
        src={Bee}
        className="logo__bee_logo"
        alt="bee_logo"
        width={80}
        height={80}
      />)}
      Chat <span className="logo__bees">bees</span>
    </div>
  );
};

export default Logo;
