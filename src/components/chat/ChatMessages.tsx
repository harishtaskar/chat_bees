"use client";
import React, { CSSProperties, useEffect } from "react";
import UserComponent from "../user/UserComponent";
import "./index.scss";
import Badge from "../shared/Badge";
import { useRecoilState } from "recoil";
import { allUsersAtom } from "@/state/Atom";
import useNetwork from "@/hooks/useNetwork";

type Props = {
  users: any;
  onUserClick: Function;
  active?: string;
  styles?: CSSProperties;
};

const ChatMessages = ({ onUserClick, active, styles }: Props) => {
  const [users, setUsers] = useRecoilState(allUsersAtom);
  const { getRequest } = useNetwork();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getRequest("/user/users");
      if (response?.res === "ok") {
        setUsers(response.users);
      }
    };
    fetchUsers();
  }, []);

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
        {users?.map((user: IUser) => {
          return (
            <li
              className="messeges__list__item"
              onClick={() => onUserClick(user)}
              key={user.id}
            >
              <UserComponent
                user={user}
                isActive={user.id === active || false}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatMessages;
