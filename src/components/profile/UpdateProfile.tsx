"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "../Modals/Modal";
import InputText from "../shared/inputText";
import PrimaryButton, { SecondaryButton } from "../shared/Buttons";
import "./index.scss";
import { useRecoilState } from "recoil";
import { userAtom } from "@/state/Atom";
import SelectBox from "../shared/SelectBox";
import useNetwork from "@/hooks/useNetwork";
import { toast } from "react-toastify";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const UpdateProfile = ({ onClose }: Props) => {
  const [user, setUser] = useRecoilState(userAtom);
  const { patchRequest, loading } = useNetwork();

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
    const response = await patchRequest("/user/update", { update: user });
    if (response?.res === "ok") {
      setUser(response?.user);
      toast.success("Profile Updated");
      return true;
    } else {
      toast.error(response?.msg || "Something went wrong");
      return false;
    }
  };

  const updateHandler = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      const isUpdated = await updateProfile();
      if (isUpdated) {
        onClose(event);
      }
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
              id="dob"
              onChange={inputChangeHandler}
              inputType="date"
              label="Date of Birth"
              value={user?.dob?.toString()?.substring(0, 10)}
              defaultValue={user?.dob?.toString()?.substring(0, 10)}
              max={99}
              min={16}
              warning={"invalid dob"}
            />
            <SelectBox
              id="gender"
              name="gender"
              onChange={selectChangeHandler}
              label={"Gender"}
              options={["Male", "Female"]}
              value={user?.gender}
            />
          </div>
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
