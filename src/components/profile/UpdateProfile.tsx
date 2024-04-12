"use client";
import React, { useMemo } from "react";
import Modal from "../Modals/Modal";
import InputText from "../shared/inputText";
import PrimaryButton, { SecondaryButton } from "../shared/Buttons";
import "./index.scss";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/state/Atom";
import SelectBox from "../shared/SelectBox";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const UpdateProfile = ({ onClose }: Props) => {
  const user = useRecoilValue(userAtom);
  console.log(user);

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
            require={false}
            value={user?.username}
          />
          <InputText
            id="occupation"
            onChange={() => {}}
            inputType="text"
            label="Occupation"
            require={false}
            value={user?.occupation}
          />
          <div className="horizontaldiv">
            <InputText
              id="age"
              onChange={() => {}}
              inputType="Number"
              label="Age"
              require={false}
              value={user?.age}
            />
            <SelectBox
              id="gender"
              name="gender"
              onChange={() => {}}
              label={"Gender"}
              options={["male", "female"]}
              value={user?.gender}
            />
          </div>
          <InputText
            id="newpassword"
            onChange={() => {}}
            inputType="password"
            label="New Password"
            password={true}
            require={false}
          />
          <InputText
            id="confirm_password"
            onChange={() => {}}
            inputType="password"
            label="Confirm Password"
            password={true}
            require={false}
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
  }, [onClose]);

  return (
    <Modal
      closeBtn={false}
      body={renderBody}
      onClose={onClose}
      modalstyle={{ width: "100%", margin: "0px 20px", maxWidth: "500px" }}
    />
  );
};

export default UpdateProfile;
