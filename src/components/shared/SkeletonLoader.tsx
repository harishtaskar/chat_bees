import React, { CSSProperties } from "react";
import "./loader.scss";

type Props = {
  style?: CSSProperties;
  count?: number;
};

const SkeletonLoader = ({ style, count = 1 }: Props) => {
  const iterationArray = Array.from({ length: count });

  return iterationArray.map((_, index:number) => {
    return <i className="card-title skeleton" style={style} key={index}/>;
  });
};

export default SkeletonLoader;
