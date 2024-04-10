"use client";
import Modal from "@/components/Modals/Modal";
import Logo from "@/components/shared/Logo";
import React, { useCallback, useMemo, useState } from "react";
import "../index.scss";
import InputText from "@/components/shared/inputText";
import PrimaryButton from "@/components/shared/Buttons";
import Link from "next/link";

type Input = {
  username: string;
  password: string;
};

const Signin = () => {
  const [input, setInput] = useState<Input>({
    username: "",
    password: "",
  });

  const onChange = useCallback((name: string, value: string) => {
    setInput((prev: Input) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const submitHandler = useCallback(() => {
    //Add Signin logic here
    console.log(input);
    setInput({
      username: "",
      password: "",
    });
  }, [input]);

  const renderBody = useMemo(() => {
    return (
      <div className="page__body">
        <span className="page__body__title">Sign In</span>
        <div className="page__body__form">
          <InputText
            id="username"
            onChange={onChange}
            inputType="text"
            label="Username"
            value={input?.username}
          />
          <InputText
            id="password"
            onChange={onChange}
            inputType="password"
            label="Password"
            password={true}
            value={input?.password}
          />
          <PrimaryButton
            name={"Submit"}
            onClick={submitHandler}
            style={{ marginTop: "10px" }}
          />
          <div className="horizontaldiv">
            <Link className={"link"} href="/signup">
              Signup
            </Link>
            <Link className={"link"} href="/signin">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    );
  }, [input]);

  return (
    <div className="page">
      <div className="page__logo">
        <Logo />
      </div>
      <Modal
        body={renderBody}
        closeBtn={false}
        backgroundstyle={{
          width: "100%",
          height: "fit-content",
          backgroundColor: "transparent",
          position: "relative",
        }}
        modalstyle={{
          width: "100%",
          maxWidth: "440px",
          position: "relative",
          borderRadius: "12px",
          margin: "30px 20px",
        }}
      />
    </div>
  );
};

export default Signin;
