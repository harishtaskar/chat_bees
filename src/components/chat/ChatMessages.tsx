"use client";
import React, { CSSProperties, useEffect, useCallback } from "react";
import UserComponent from "../user/UserComponent";
import "./index.scss";
import Badge from "../shared/Badge";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeUserAtom,
  connectionsAtom,
  modalAtom,
  recallConnectionAPI,
  userAtom,
} from "@/state/Atom";
import useNetwork from "@/hooks/useNetwork";
import SkeletonLoader from "../shared/SkeletonLoader";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  styles?: CSSProperties;
};

const ChatMessages = ({ styles }: Props) => {
  const user = useRecoilValue(userAtom);
  const recallCAPI = useRecoilValue(recallConnectionAPI);
  const setActiveModel = useSetRecoilState(modalAtom);
  const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
  const [connections, setConnections] = useRecoilState(connectionsAtom);
  const { getRequest } = useNetwork();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getRequest("/user/connections");
      if (response?.res === "ok") {
        setConnections(response?.connections);
      } else {
        setConnections(undefined);
        toast.error("Something went wrong");
      }
    };
    fetchUsers();
  }, [recallCAPI]);

  const onUserClick = useCallback((user: any) => {
    setActiveUser(user);
    router.push(`/chat/messages/${user?.conversation}`);
  }, []);

  return (
    <div className="messeges" style={styles}>
      <div className="messeges__topbar">
        <div className="messeges__title">
          Messeges <Badge text={23} />
        </div>
        <button
          className="messeges__btn"
          onClick={(e: any) => {
            e.stopPropagation();
            setActiveModel("search-user");
          }}
        >
          <i className="ri-add-circle-fill ri-2x span" />
        </button>
      </div>
      <ul className="messeges__list">
        {connections ? (
          connections?.map((user: IUser) => {
            return (
              <div
                className="messeges__list__item"
                onClick={() => onUserClick(user)}
                key={user?._id}
              >
                <UserComponent
                  user={user}
                  isActive={user?._id === activeUser?._id}
                />
              </div>
            );
          })
        ) : (
          <SkeletonLoader
            style={{ width: "312px", height: "60px", borderRadius: "8px" }}
            count={10}
          />
        )}
        {!connections ||
          (connections?.length === 0 && (
            <div
              className={"user"}
              style={{ whiteSpace: "nowrap", color: "var(--text-color-2)" }}
            >
              You do not have any connections
            </div>
          ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
