import React from "react";
import "./index.scss";

type Props = {};

const LoaderBar = (props: Props) => {
  return (
    <div className="loader">
      <div className="loaderBar"></div>
    </div>
  );
};

export default LoaderBar;
