"use client";
import React from "react";
import "./index.scss";
import Logo from "../shared/Logo";

type Props = {};

const Navbar = ({}: Props) => {
  return (
    <div className="navbar">
      <Logo image={false} />
    </div>
  );
};

export default Navbar;
