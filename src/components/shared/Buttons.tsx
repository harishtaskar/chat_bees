"use client";
import { CSSProperties, MouseEventHandler, ReactNode, useEffect } from "react";
import "./index.scss";

type Props = {
  name: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  isDisable?: boolean;
  style?: CSSProperties;
};

export const PrimaryButton = ({
  name,
  onClick,
  isLoading,
  isDisable,
  style,
}: Props) => {
  return (
    <button
      className={"primarybutton"}
      onClick={onClick}
      type="submit"
      disabled={isDisable || isLoading}
      style={
        isDisable
          ? { ...style, cursor: "not-allowed", opacity: "40%" }
          : { ...style }
      }
    >
      {isLoading ? <i className="loading" /> : name}
    </button>
  );
};

export const SecondaryButton = ({ name, onClick, style, isLoading }: Props) => {
  return (
    <button
      className={"secondarybutton"}
      onClick={onClick}
      type="reset"
      style={style}
    >
      {name}
      {isLoading ? <i className="loading" /> : name}
    </button>
  );
};

export default PrimaryButton;
