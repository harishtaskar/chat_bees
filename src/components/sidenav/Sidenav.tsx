"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./index.scss";
import Logo from "../shared/Logo";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Bee from "../../assets/images/bee.png";
import MessagesPopup from "../shared/MessagesPopup";
import ChatMessages from "../chat/ChatMessages";
import users from "../../assets/jsons/users.json";
import { useRecoilState } from "recoil";
import { activeUserAtom } from "@/state/Atom";

type Props = {};

const Sidenav = ({}: Props) => {
  const msgRef = useRef<any>(null);
  const [activeUser, setActiveUser] = useRecoilState<IUser | undefined>(
    activeUserAtom
  );
  const [popup, setPopup] = useState<boolean>(false);

  // clicked outside of msgDiv
  useEffect(() => {
    function handler(event: MouseEvent) {
      if (!msgRef.current?.contains(event.target)) {
        // change starts here
        setTimeout(() => {
          setPopup(false);
        }, 300);
        // change starts here
      }
    }
    global.window?.addEventListener("click", handler);
    return () => global.window?.removeEventListener("click", handler);
  }, []);

  const userClickHandler = useCallback((user: IUser) => {
    setActiveUser(user);
  }, []);

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

          <li
            className="sidenav__links__list__list_item_mobile"
            onClick={() => setPopup((prev) => !prev)}
            ref={msgRef}
          >
            <div className="sidenav__links__list__list_item_mobile__msg_badge">
              5
            </div>
            <Link
              href={"/chat"}
              className={`sidenav__links__list__list_item__link`}
            >
              <i className="ri-chat-3-line ri-xl" />{" "}
              <span className={`sidenav__links__list__list_item__link__text`}>
                Messages
              </span>
            </Link>
          </li>
          {popup && (
            <MessagesPopup
              body={
                <ChatMessages
                  users={users}
                  onUserClick={userClickHandler}
                  active={activeUser?.user_id}
                  styles={{ maxHeight: "70vh", height: "100%" }}
                />
              }
            />
          )}
          <li className="sidenav__links__list__list_item">
            <Link
              href={"/chat/profile"}
              className={`sidenav__links__list__list_item__link ${
                pathname === "/chat/profile" ? "active" : ""
              }`}
            >
              <i className="ri-user-line ri-xl" />{" "}
              <span className={`sidenav__links__list__list_item__link__text`}>
                Profile
              </span>
            </Link>
          </li>
        </ul>
        <div className="sidenav__links__linkdiv">
          <Link
            href={"/signin"}
            className={`sidenav__links__linkdiv__link ${
              pathname === "/" ? "active" : ""
            }`}
            onClick={() =>
              global.window.localStorage.setItem("Authorization", "")
            }
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
