"use client";
import React, { useMemo } from "react";
import Modal from "../Modals/Modal";
import InputText from "../shared/inputText";
import PrimaryButton, { SecondaryButton } from "../shared/Buttons";
import "./index.scss";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const UpdateProfile = ({ onClose }: Props) => {
  const renderBody = useMemo(() => {
    return (
      <div className="body">
        <div className="body__update_form">
          <span className="body__update_form__title">Update Profile</span>
          <InputText
            id="username"
            onChange={() => {}}
            inputType="text"
            label="Username"
          />
          <div className="horizontaldiv">
            <InputText
              id="age"
              onChange={() => {}}
              inputType="Number"
              label="Age"
            />
            <InputText
              id="Gender"
              onChange={() => {}}
              inputType="Text"
              label="Gender"
            />
          </div>
          <InputText
            id="oldPassword"
            onChange={() => {}}
            inputType="password"
            label="Old Password"
            password={true}
          />
          <InputText
            id="newpassword"
            onChange={() => {}}
            inputType="password"
            label="New Password"
            password={true}
          />
          <InputText
            id="confirm_password"
            onChange={() => {}}
            inputType="password"
            label="Confirm Password"
            password={true}
          />
          <div className="horizontaldiv">
            <SecondaryButton
              name={"Cancel"}
              onClick={onClose}
              style={{ marginTop: "10px" }}
            />
            <PrimaryButton
              name={"Update"}
              onClick={() => {}}
              style={{ marginTop: "10px" }}
            />
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <Modal
      closeBtn={false}
      body={renderBody}
      onClose={onClose}
      modalstyle={{ margin: "0px 20px", maxWidth: "560px" }}
    />
  );
};

export default UpdateProfile;
