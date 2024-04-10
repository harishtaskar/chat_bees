"use client";
import Modal from "@/components/Modals/Modal";
import Logo from "@/components/shared/Logo";
import React, { useCallback, useMemo, useState } from "react";
import "../index.scss";
import InputText from "@/components/shared/inputText";
import PrimaryButton from "@/components/shared/Buttons";
import Link from "next/link";

const Signup = () => {
  const [input, setInput] = useState<any>({});

  const onChange = useCallback((name: string, value: string | number) => {
    setInput((prev: any) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const submitHandler = useCallback(() => {
    //Add Signup logic here
    console.log(input);
    setInput({
      username: "",
      password: "",
      designation: "",
      gender: "male",
      age: null,
    });
  }, [input]);

  const renderBody = useMemo(() => {
    return (
      <div className="page__body">
        <span className="page__body__title">Sign Up</span>
        <div className="page__body__form">
          <InputText
            id="username"
            onChange={onChange}
            inputType="text"
            label="Username"
            value={input.username}
          />
          <div className="horizontaldiv">
            <InputText
              id="age"
              onChange={onChange}
              inputType="number"
              label="Age"
              value={input.age}
              max={60}
              min={16}
              warning={"invalid age"}
            />
            <InputText
              id="gender"
              onChange={onChange}
              inputType="Text"
              label="Gender"
              value={input.gender}
            />
          </div>
          <InputText
            id="password"
            onChange={onChange}
            inputType="password"
            label="Password"
            password={true}
            value={input.password}
            maxLength={22}
            minLength={8}
            warning="password is too short"
          />
          <InputText
            id="confirm_password"
            onChange={() => {}}
            inputType="password"
            label="Confirm Password"
            password={true}
            maxLength={22}
          />
          <PrimaryButton
            name={"Submit"}
            onClick={submitHandler}
            style={{ marginTop: "10px" }}
          />
          <div className="horizontaldiv">
            <Link className={"link"} href="/signin">
              Signin
            </Link>
            <Link className={"link"} href="/signup">
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
          maxWidth: "460px",
          position: "relative",
          borderRadius: "12px",
          margin: "30px 20px",
        }}
      />
    </div>
  );
};

export default Signup;
