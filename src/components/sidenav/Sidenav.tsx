"use client";
import React from "react";
import "./index.scss";
import Logo from "../shared/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const Sidenav = ({}: Props) => {
  const pathname = usePathname();
  return (
    <div className="sidenav">
      <div className="sidenav__logo">
        <Logo />
      </div>
      <div className="sidenav__links">
        <ul className="sidenav__links__list">
          <li className="sidenav__links__list__list_item">
            <Link
              href={"/chat"}
              className={`sidenav__links__list__list_item__link ${
                pathname === "/chat" ? "active" : ""
              }`}
            >
              <i className="ri-wechat-line ri-xl" /> Chat
            </Link>
          </li>
          <li>
            <Link
              href={"/chat/profile"}
              className={`sidenav__links__list__list_item__link ${
                pathname === "/chat/profile" ? "active" : ""
              }`}
            >
              <i className="ri-user-line ri-xl" /> Profile
            </Link>
          </li>
        </ul>
        <div className="sidenav__links__linkdiv">
          <Link
            href={"/signin"}
            className={`sidenav__links__list__list_item__link ${
              pathname === "/" ? "active" : ""
            }`}
          >
            <i className="ri-logout-circle-line" /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
