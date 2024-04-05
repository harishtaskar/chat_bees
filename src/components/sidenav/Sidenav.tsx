"use client";
import React from "react";
import "./index.scss";
import Logo from "../shared/Logo";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Bee from "../../assets/images/bee.png";

type Props = {};

const Sidenav = ({}: Props) => {
  const pathname = usePathname();
  return (
    <div className="sidenav">
      <div className="sidenav__logo">
        <Logo />
      </div>
      <div className="sidenav__mobile">
        <Image
          src={Bee}
          className="sidenav__icon"
          alt="bee_logo"
          width={25}
          height={25}
        />
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
              <i className="ri-wechat-line ri-xl" />{" "}
              <span className={`sidenav__links__list__list_item__link__text`}>
                Chat
              </span>
            </Link>
          </li>
          <li className="sidenav__links__list__list_item">
            <Link
              href={"/chat/profile"}
              className={`sidenav__links__list__list_item__link ${
                pathname === "/chat/profile" ? "active" : ""
              }`}
            >
              <i className="ri-user-line ri-xl" />{" "}
              {/* <span className={`sidenav__links__list__list_item__link__text`}>
                Profile
              </span> */}
            </Link>
          </li>
        </ul>
        <div className="sidenav__links__linkdiv">
          <Link
            href={"/signin"}
            className={`sidenav__links__linkdiv__link ${
              pathname === "/" ? "active" : ""
            }`}
          >
            <i className="ri-logout-circle-line" />{" "}
            <span className={`sidenav__links__linkdiv__link__text`}>
              Logout
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
