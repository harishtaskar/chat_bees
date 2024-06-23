"use client";
import React, { useCallback, useState, useEffect, useRef } from "react";
import "./index.scss";
import UserIcon from "../icons/UserIcon";
import Badge from "../shared/Badge";
import { useSetRecoilState } from "recoil";
import { modalAtom, userProfileAtom, recallConnectionAPI } from "@/state/Atom";
import useNetwork from "@/hooks/useNetwork";
import { toast } from "react-toastify";

type Props = {
  user: IUser;
  isActive?: boolean;
};

const UserComponent = ({ user, isActive = false }: Props) => {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const setRecallConnectionsAPI = useSetRecoilState(recallConnectionAPI);
  const setActiveModal = useSetRecoilState(modalAtom);
  const setUserProfileDetails = useSetRecoilState(userProfileAtom);
  const divRef: any = useRef(null);
  const { deleteRequest } = useNetwork();

  useEffect(() => {
    function handler(event: MouseEvent) {
      if (!divRef.current?.contains(event.target)) {
        // change starts here
        setIsMenuActive(false);
        // change starts here
      }
    }
    global.window?.addEventListener("click", handler);
    return () => global.window?.removeEventListener("click", handler);
  }, []);

  const profileClickHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      setActiveModal("user-profile");
      setUserProfileDetails(user);
    },
    [user]
  );

  const removeConnectionHandler = useCallback(async (event: any) => {
    event.stopPropagation();
    const response = await deleteRequest("/chat/leave", {
      user_id: user?._id,
    });
    if (response.res === "ok") {
      toast.success("Connection Closed");
      setRecallConnectionsAPI((prev) => !prev);
      setIsMenuActive(false);
    } else {
      toast.error(response.msg);
    }
  }, []);

  return (
    <div className={`user ${isActive ? "user__active" : ""}`}>
      <div onClick={profileClickHandler}>
        <UserIcon icon={user?.profileIcon || "icon1"} />
      </div>
      <div className="user__container">
        <div className={"user__container__first"}>
          <span className="user__container__first__title">
            {user?.username}
          </span>
          <span className="user__container__first__subtitle">
            {user?.occupation}
          </span>
        </div>
        <div className={"user__container__second"}>
          {/* <Badge text={user?.iconIndex || 1} /> */}
          <i
            className="ri-more-2-fill"
            style={{ display: "flex", color: "var(--text-color)" }}
            onClick={(event: any) => {
              event.stopPropagation();
              setIsMenuActive((prev) => !prev);
            }}
          />
          {isMenuActive && (
            <div className={"user__container__second__menu"} ref={divRef}>
              <span
                style={{ color: "var(--red-color)" }}
                className={"user__container__second__menu__item"}
                onClick={removeConnectionHandler}
              >
                Remove
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
