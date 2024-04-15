"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "../Modals/Modal";
import InputText from "../shared/inputText";
import PrimaryButton, { SecondaryButton } from "../shared/Buttons";
import "./index.scss";
import useNetwork from "@/hooks/useNetwork";
import { toast } from "react-toastify";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

type Input = {
  oldpassword: string;
  newpassword: string;
  confirmpassword: string;
};

const ChangePassword = ({ onClose }: Props) => {
  const [input, setInput] = useState<Input>({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });
  const { patchRequest, loading } = useNetwork();

  const inputChangeHandler = useCallback((name: string, value: any) => {
    setInput((prev: any) => {
      return { ...prev, [name]: value };
    });
  }, []);

  //   const changePassword = async () => {
  //     const response = await patchRequest("/user/update", { updates: user });
  //     if (response?.res === "ok") {
  //       setInput(response?.user);
  //       toast.success("Profile Updated");
  //     } else {
  //       toast.error("Something went wrong");
  //     }
  //   };

  const updateHandler = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      if (input?.newpassword !== input?.confirmpassword) {
        toast.error("Password not matched");
      } else {
        console.log(input);
      }
    },
    [input]
  );

  const renderBody = useMemo(() => {
    return (
      <div className="body">
        <div className="body__update_form">
          <span className="body__update_form__title">Change Password</span>
          <InputText
            id="oldpassword"
            onChange={inputChangeHandler}
            inputType="password"
            label="Old Password"
            password={true}
          />
          <InputText
            id="newpassword"
            onChange={inputChangeHandler}
            inputType="password"
            label="New Password"
            password={true}
          />

          <InputText
            id="confirmpassword"
            onChange={inputChangeHandler}
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
              onClick={updateHandler}
              style={{ marginTop: "10px" }}
              isDisable={loading}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    );
  }, [onClose, input, loading]);

  return (
    <Modal
      closeBtn={false}
      body={renderBody}
      onClose={onClose}
      modalstyle={{ width: "100%", margin: "0px 20px", maxWidth: "500px" }}
    />
  );
};

export default ChangePassword;
