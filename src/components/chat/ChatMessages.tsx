"use client";
import React, { CSSProperties } from "react";
import UserComponent from "../user/UserComponent";
import "./index.scss";
import Badge from "../shared/Badge";
import { useSetRecoilState } from "recoil";
import { modalAtom } from "@/state/Atom";

type Props = {
  users: any;
  onUserClick: Function;
  active?: string;
  styles?: CSSProperties;
};

const ChatMessages = ({ users, onUserClick, active, styles }: Props) => {
  const setActiveModel = useSetRecoilState(modalAtom);
  return (
    <div className="messeges" style={styles}>
      <div className="messeges__topbar">
        <div className="messeges__title">
          Messeges <Badge text={23} />
        </div>
        <button
          className="messeges__btn"
          onClick={() => setActiveModel("search-user")}
        >
          <i className="ri-add-circle-fill ri-2x" />
        </button>
      </div>
      <ul className="messeges__list">
        {users?.map((user: IUser) => {
          return (
            <li
              className="messeges__list__item"
              onClick={() => onUserClick(user)}
              key={user.user_id}
            >
              <UserComponent
                user={user}
                isActive={user?.user_id === active || false}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatMessages;
