"use client";
import React, { useState } from "react";
import "./index.scss";
import UserComponent from "@/components/user/UserComponent";
import users from "@/assets/jsons/users.json";
import ChatNavbar from "@/components/navbar/ChatNavbar";
import InputComponent from "@/components/chat/InputComponent";

type Props = {};

const Chat = ({}: Props) => {
  const [active, setActive] = useState<string>("");

  return (
    <div className="chat">
      <div className="chat__messeges">
        <div className="chat__messeges__topbar">
          <div className="chat__messeges__title">
            Messeges <p className="chat__messeges__title__badge">23</p>
          </div>
          <span className="chat__messeges__title">Btn</span>
        </div>
        <ul className="chat__messeges__list">
          {users?.map((user) => {
            return (
              <li
                className="chat__messeges__list__item"
                onClick={() => setActive(user.id)}
                key={user.id}
              >
                <UserComponent
                  isActive={user.id === active}
                  designation={user.designation}
                  username={user.username}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="chat__chat_container">
        <ChatNavbar />
        <InputComponent />
      </div>
    </div>
  );
};

export default Chat;
