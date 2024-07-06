"use client";
import Modal from "@/components/Modals/Modal";
import Logo from "@/components/shared/Logo";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../index.scss";
import InputText from "@/components/shared/inputText";
import PrimaryButton from "@/components/shared/Buttons";
import Link from "next/link";
import { toast } from "react-toastify";
import useNetwork from "@/hooks/useNetwork";
import useAuth from "@/hooks/useAuth";
import SplashScreen from "@/app/loading";

type Input = {
  username: string;
  password: string;
};

const Signin = () => {
  const [input, setInput] = useState<Input>({
    username: "",
    password: "",
  });
  const { postRequest, loading: netLoading } = useNetwork();
  const { loginUser, authorizeUser, loading } = useAuth();

  useEffect(() => {
    authorizeUser();
  }, []);

  const onChange = useCallback((name: string, value: string) => {
    setInput((prev: Input) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const validateInputs = useMemo(() => {
    if (input?.username && input?.password) {
      return true;
    }
    return false;
  }, [input]);

  const submitHandler = useCallback(async () => {
    //Add Signin logic here
    try {
      const response = await postRequest(
        "/user/signin",
        {},
        {
          username: input.username,
          password: input.password,
        }
      );
      if (response.res === "ok") {
        loginUser(response.token, response.user);
        toast.success(response.msg);
        setInput({
          username: "",
          password: "",
        });
      } else {
        toast.info(response.msg);
      }
    } catch (error) {
      toast.error("something went wrong, please try again later");
    }
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
            minLength={8}
            maxLength={22}
          />
          <PrimaryButton
            name={"Submit"}
            onClick={submitHandler}
            style={{ marginTop: "10px" }}
            isLoading={netLoading}
            isDisable={netLoading || !validateInputs}
          />
          <div className="horizontaldiv">
            <Link className={"link"} href="/user/signup">
              Signup
            </Link>
            <Link className={"link"} href="/user/signin">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    );
  }, [input]);

  if (loading) {
    return <SplashScreen />;
  } else {
    return (
      <div className="page">
        <div className="logo_above_form">
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
  }
};

export default Signin;
