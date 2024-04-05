"use client";
import Modal from "@/components/Modals/Modal";
import Logo from "@/components/shared/Logo";
import React, { useMemo } from "react";
import "../index.scss";
import InputText from "@/components/shared/inputText";
import PrimaryButton from "@/components/shared/Buttons";
import Link from "next/link";

type Props = {};

const Signin = ({}: Props) => {
  const renderBody = useMemo(() => {
    return (
      <div className="page__body">
        <span className="page__body__title">Sign In</span>
        <div className="page__body__form">
          <InputText
            id="username"
            onChange={() => {}}
            inputType="text"
            label="Username"
          />
          <InputText
            id="password"
            onChange={() => {}}
            inputType="password"
            label="Password"
            password={true}
          />
          <PrimaryButton
            name={"Submit"}
            onClick={() => {}}
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
          width: "100%",
          minHeight: "fit-content",
          backgroundColor: "transparent",
          position: "relative",
        }}
        modalstyle={{
          width: "100%",
          maxWidth: "480px",
          position: "relative",
          borderRadius: "12px",
          margin: "30px 20px",
        }}
      />
    </div>
  );
};

export default Signin;
