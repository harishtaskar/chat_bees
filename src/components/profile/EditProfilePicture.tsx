"use client";
import React, { useMemo, useState } from "react";
import Modal from "../Modals/Modal";
import UserIcon, { Insect } from "../icons/Icons";
import "./index.scss";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const EditProfilePicture = ({ onClose }: Props) => {
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);

  const renderBody = useMemo(() => {
    return (
      <div className="body">
        <div className={"body__icons"}>
          {Insect.map((item: any, index: number) => {
            return (
              <div
                className={`body__icons__icon ${
                  selectedIconIndex === index && "body__icons__active"
                }`}
                onClick={() => setSelectedIconIndex(index)}
              >
                <UserIcon insectIndex={index} width={40} height={40} />
              </div>
            );
          })}
        </div>
        <div className={"body__buttons"}>
          <button className={"body__buttons__btn"} onClick={onClose}>
            Cancel
          </button>
          <button className={"body__buttons__btn"}>Submit</button>
        </div>
      </div>
    );
  }, [selectedIconIndex]);
  return (
    <Modal
      closeBtn={false}
      body={renderBody}
      onClose={onClose}
      modalstyle={{ margin: "0px 20px", maxWidth: "560px" }}
    />
  );
};

export default EditProfilePicture;
