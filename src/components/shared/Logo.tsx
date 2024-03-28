import React, { CSSProperties } from "react";

type Props = {
  style: CSSProperties;
};

const Logo = ({ style }: Props) => {
  return (
    <div style={style} className="logo">
      Chat <span className="logo__bees">bees</span>
    </div>
  );
};

export default Logo;
