"use client";
import React from "react";
import UserComponent from "../user/UserComponent";
import "./index.scss";

type Props = {
  users: any;
  onUserClick: Function;
  active: string;
};

const ChatMessages = ({ users, onUserClick, active }: Props) => {
  return (
    <div className="messeges">
      <div className="messeges__topbar">
        <div className="messeges__title">
          Messeges <p className="messeges__title__badge">23</p>
        </div>
        <button className="messeges__btn">
          <i className="ri-add-circle-fill ri-2x" />
        </button>
      </div>
      <ul className="messeges__list">
        {users?.map((user: any) => {
          return (
            <li
              className="messeges__list__item"
              onClick={() => onUserClick(user.id)}
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
  );
};

export default ChatMessages;
