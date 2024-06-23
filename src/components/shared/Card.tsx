import React, { CSSProperties, ReactElement } from "react";

type Props = {
  body: ReactElement;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Card = ({ body, style, onClick }: Props) => {
  return (
    <div className="card" style={style} onClick={onClick}>
      {body}
    </div>
  );
};

export default Card;
