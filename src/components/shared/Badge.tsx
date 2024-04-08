import React from "react";

type Props = {
  text: string | number;
};

const Badge = ({ text }: Props) => {
  return <span className="badge">{text}</span>;
};

export default Badge;
