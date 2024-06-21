"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "../Modals/Modal";
import UserIcon from "../icons/UserIcon";
import "./index.scss";
import useNetwork from "@/hooks/useNetwork";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "@/state/Atom";
import { Icons } from "../icons/Icons";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const EditProfilePicture = ({ onClose }: Props) => {
  const [user, setUser] = useRecoilState(userAtom);
  const { patchRequest } = useNetwork();
  const [selectedIcon, setSelectedIcon] = useState(user?.profileIcon);

  const onSubmit = useCallback(
    (event: any) => {
      const updateProfile = async () => {
        const response = await patchRequest("/user/update", {
          update: { profileIcon: selectedIcon },
        });
        if (response?.res === "ok") {
          setUser(response.user);
        }
      };
      updateProfile();
      onClose(event);
    },
    [selectedIcon]
  );

  const renderBody = useMemo(() => {
    return (
      <div className="body">
        <div className={"body__icons"}>
          {Icons.map((item: any) => {
            return (
              <div
                key={item}
                className={`body__icons__icon ${
                  selectedIcon === item?.name && "body__icons__active"
                }`}
                onClick={() => setSelectedIcon(item?.name)}
              >
                <UserIcon icon={item?.name} width={60} height={60} />
              </div>
            );
          })}
        </div>
        <div className={"body__buttons"}>
          <button className={"body__buttons__btn"} onClick={onClose}>
            Cancel
          </button>
          <button className={"body__buttons__btn"} onClick={onSubmit}>
            Change
          </button>
        </div>
      </div>
    );
  }, [selectedIcon, onClose]);
  return (
    <Modal
      closeBtn={false}
      body={renderBody}
      onClose={onClose}
      modalstyle={{ margin: "0px 20px", maxWidth: "580px" }}
    />
  );
};

export default EditProfilePicture;
