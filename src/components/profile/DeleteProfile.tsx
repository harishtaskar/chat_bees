"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "../Modals/Modal";
import InputText from "../shared/inputText";
import PrimaryButton, { SecondaryButton } from "../shared/Buttons";
import "./index.scss";
import useNetwork from "@/hooks/useNetwork";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/state/Atom";
import { useRouter } from "next/navigation";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const DeleteProfile = ({ onClose }: Props) => {
  const user: IUser | undefined = useRecoilValue(userAtom);
  const [input, setInput] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);
  const { deleteRequest, loading } = useNetwork();
  const router = useRouter();

  useEffect(() => {
    if (input === user?.username) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [input]);

  const inputChangeHandler = useCallback(
    (name: string, value: any) => {
      setInput(value);
    },
    [user]
  );

  const deleteProfile = async () => {
    const response = await deleteRequest("/user/delete", {
      username: user?.username,
    });
    if (response?.res === "ok") {
      toast.success(response?.msg);
      setInput("");
      global.window.localStorage.setItem("Authorization", "");
      router.push("/user/signin");
    } else {
      toast.error(response?.msg || "Something went wrong");
    }
  };

  const deleteHandler = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      deleteProfile();
      onClose(event);
    },
    [input]
  );

  const renderBody = useMemo(() => {
    return (
      <div className="body">
        <div className="body__update_form">
          <span className="body__update_form__title">Deactivate Profile</span>
          <span className="body__update_form__subtitle span">
            Type{" "}
            <a href="#" className={"body__update_form__subtitle"}>
              {user?.username}
            </a>{" "}
            to Deactivate your profile
          </span>
          <InputText
            id="confirmation"
            onChange={inputChangeHandler}
            inputType="text"
            require={false}
            value={input}
            autoComplete={"off"}
          />
          <div className="horizontaldiv">
            <SecondaryButton
              name={"Cancel"}
              onClick={onClose}
              style={{ marginTop: "10px" }}
            />
            <PrimaryButton
              name={"Update"}
              onClick={deleteHandler}
              style={{ marginTop: "10px" }}
              isDisable={disable}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    );
  }, [onClose, input, loading, disable]);

  return (
    <Modal
      body={renderBody}
      onClose={onClose}
      modalstyle={{ width: "100%", margin: "0px 20px", maxWidth: "500px" }}
    />
  );
};

export default DeleteProfile;
