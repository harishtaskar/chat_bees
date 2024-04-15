"use client";
import React, { useCallback, useMemo } from "react";
import Modal from "../Modals/Modal";
import InputText from "../shared/inputText";
import PrimaryButton, { SecondaryButton } from "../shared/Buttons";
import "./index.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalAtom, userAtom } from "@/state/Atom";
import SelectBox from "../shared/SelectBox";
import useNetwork from "@/hooks/useNetwork";
import { toast } from "react-toastify";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const UpdateProfile = ({ onClose }: Props) => {
  const [user, setUser] = useRecoilState(userAtom);
  const { patchRequest, loading } = useNetwork();
  const setActiveModal = useSetRecoilState(modalAtom);

  const inputChangeHandler = useCallback((name: string, value: any) => {
    setUser((prev: any) => {
      if (name === "age") {
        return { ...prev, [name]: parseInt(value) };
      }
      return { ...prev, [name]: value };
    });
  }, []);

  const selectChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      setUser((prev: any) => {
        return { ...prev, [name]: value };
      });
    },
    []
  );

  const updateProfile = async () => {
    const response = await patchRequest("/user/update", { updates: user });
    if (response?.res === "ok") {
      setUser(response?.user);
      toast.success("Profile Updated");
    } else {
      toast.error(response?.msg || "Something went wrong");
    }
  };

  const updateHandler = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      await updateProfile();
      onClose(event);
    },
    [user]
  );

  const renderBody = useMemo(() => {
    return (
      <div className="body">
        <div className="body__update_form">
          <span className="body__update_form__title">Update Profile</span>
          <InputText
            id="username"
            onChange={inputChangeHandler}
            inputType="text"
            label="Username"
            require={false}
            value={user?.username}
          />
          <InputText
            id="occupation"
            onChange={inputChangeHandler}
            inputType="text"
            label="Occupation"
            require={false}
            value={user?.occupation}
          />
          <div className="horizontaldiv">
            <InputText
              id="age"
              onChange={inputChangeHandler}
              inputType="number"
              label="Age"
              require={false}
              value={user?.age}
            />
            <SelectBox
              id="gender"
              name="gender"
              onChange={selectChangeHandler}
              label={"Gender"}
              options={["male", "female"]}
              value={user?.gender}
            />
          </div>
          {/* <InputText
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
          /> */}
          <div className="horizontaldiv">
            <SecondaryButton
              name={"Cancel"}
              onClick={onClose}
              style={{ marginTop: "10px" }}
            />
            <PrimaryButton
              name={"Update"}
              onClick={updateHandler}
              style={{ marginTop: "10px" }}
              isDisable={loading}
              isLoading={loading}
            />
          </div>
          <div className="horizontaldiv">
            <button
              className={"link"}
              onClick={() => setActiveModal("change-password")}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    );
  }, [onClose, user, loading]);

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
