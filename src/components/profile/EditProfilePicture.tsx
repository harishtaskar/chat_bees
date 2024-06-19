"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "../Modals/Modal";
import UserIcon from "../icons/UserIcon";
import "./index.scss";
import useNetwork from "@/hooks/useNetwork";
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/state/Atom";
import { Icons } from "../icons/Icons";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const EditProfilePicture = ({ onClose }: Props) => {
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const { patchRequest } = useNetwork();
  const setUser = useSetRecoilState(userAtom);

  const onSubmit = useCallback(
    (event: any) => {
      const updateProfile = async () => {
        const response = await patchRequest("/user/update", {
          updates: { iconIndex: selectedIconIndex },
        });
        if (response?.res === "ok") {
          setUser(response.user);
        }
      };
      updateProfile();
      onClose(event);
    },
    [selectedIconIndex]
  );

  const renderBody = useMemo(() => {
    return (
      <div className="body">
        <div className={"body__icons"}>
          {Icons.map((item: any, index: number) => {
            return (
              <div
                key={item}
                className={`body__icons__icon ${
                  selectedIconIndex === index && "body__icons__active"
                }`}
                onClick={() => setSelectedIconIndex(index)}
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
  }, [selectedIconIndex, onClose]);
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
