"use client";
import Modal from "@/components/Modals/Modal";
import Logo from "@/components/shared/Logo";
import React, { useMemo } from "react";
import "../index.scss";
import InputText from "@/components/shared/inputText";
import PrimaryButton from "@/components/shared/Buttons";
import Link from "next/link";

type Props = {};

const Signup = (props: Props) => {
  const renderBody = useMemo(() => {
    return (
      <div className="page__body">
        <span className="page__body__title">Sign Up</span>
        <div className="page__body__form">
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
            id="password"
            onChange={() => {}}
            inputType="password"
            label="Password"
            password={true}
          />
          <InputText
            id="confirm_password"
            onChange={() => {}}
            inputType="password"
            label="Confirm Password"
            password={true}
          />
          <PrimaryButton
            name={"Submit"}
            onClick={() => {}}
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
  }, []);

  return (
    <div className="page">
      <div className="page__logo">
        <Logo />
      </div>
      <Modal
        body={renderBody}
        closeBtn={false}
        backgroundstyle={{
          width: "fit-content",
          height: "fit-content",
          backgroundColor: "transparent",
          position: "relative",
        }}
        modalstyle={{
          width: "100%",
          position: "relative",
          borderRadius: "12px",
          margin: "30px 20px",
        }}
      />
    </div>
  );
};

export default Signup;
