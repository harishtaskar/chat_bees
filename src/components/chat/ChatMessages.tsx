"use client";
import React, { CSSProperties } from "react";
import UserComponent from "../user/UserComponent";
import "./index.scss";
import Badge from "../shared/Badge";

type Props = {
  users: any;
  onUserClick: Function;
  active: string;
  styles?: CSSProperties;
};

const ChatMessages = ({ users, onUserClick, active, styles }: Props) => {
  return (
    <div className="messeges" style={styles}>
      <div className="messeges__topbar">
        <div className="messeges__title">
          Messeges <Badge text={23} />
        </div>
        <button className="messeges__btn">
          <i className="ri-add-circle-fill ri-xl" />
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
                iconIndex={user.iconIndex}
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
