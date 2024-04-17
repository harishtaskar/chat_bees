"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "../Modals/Modal";
import InputText from "../shared/inputText";
import PrimaryButton, { SecondaryButton } from "../shared/Buttons";
import "./index.scss";
import useNetwork from "@/hooks/useNetwork";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@/state/Atom";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

type Input = {
  oldpassword: string;
  newpassword: string;
  confirmpassword: string;
};

const ChangePassword = ({ onClose }: Props) => {
  const user: IUser | undefined = useRecoilValue(userAtom);
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

  const changePassword = async () => {
    const response = await patchRequest("/user/update-password", {
      passwords: {
        user_id: user?.user_id,
        oldpassword: input.oldpassword,
        newpassword: input.newpassword,
      },
    });
    if (response?.user.res === "ok") {
      toast.success(response?.user.msg);
      setInput({
        oldpassword: "",
        newpassword: "",
        confirmpassword: "",
      });
    } else {
      toast.error(response?.user.msg);
    }
  };

  const updateHandler = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      if (input?.newpassword !== input?.confirmpassword) {
        toast.error("Password not matched");
      } else {
        changePassword();
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
            value={input.oldpassword}
          />
          <InputText
            id="newpassword"
            onChange={inputChangeHandler}
            inputType="password"
            label="New Password"
            password={true}
            value={input.newpassword}
          />

          <InputText
            id="confirmpassword"
            onChange={inputChangeHandler}
            inputType="password"
            label="Confirm Password"
            password={true}
            value={input.confirmpassword}
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
      body={renderBody}
      onClose={onClose}
      modalstyle={{ width: "100%", margin: "0px 20px", maxWidth: "500px" }}
    />
  );
};

export default ChangePassword;
