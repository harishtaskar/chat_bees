"use client";
import Modal from "@/components/Modals/Modal";
import Logo from "@/components/shared/Logo";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../index.scss";
import InputText from "@/components/shared/inputText";
import PrimaryButton from "@/components/shared/Buttons";
import Link from "next/link";
import { toast } from "react-toastify";
import SelectBox from "@/components/shared/SelectBox";
import useNetwork from "@/hooks/useNetwork";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import SplashScreen from "../loading";

const Signup = () => {
  const [input, setInput] = useState<IUser | any>({
    username: "",
    password: "",
    confirm_password: "",
    occupation: "",
    gender: "male",
    age: "",
  });
  const { postRequest, loading, error } = useNetwork();
  const router = useRouter();

  const { authorizeUser, loading: pageLoading } = useAuth();
  useEffect(() => {
    authorizeUser(false);
  }, []);

  const onChange = useCallback((name: string, value: string | number) => {
    setInput((prev: any) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const selectHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setInput((prev: any) => {
        return { ...prev, [name]: value };
      });
    },
    []
  );

  const validateInputs = useMemo(() => {
    if (
      input.username &&
      input.occupation &&
      input.age &&
      input.password &&
      input.gender
    ) {
      return true;
    } else {
      return false;
    }
  }, [input]);

  const submitHandler = useCallback(async () => {
    //Add Signup logic here
    try {
      if (input?.password !== input?.confirm_password) {
        toast.error("Password not matched");
      } else {
        const response = await postRequest("/user/signup", input);
        if (response.res === "ok") {
          toast.success(response.msg);
          setInput(undefined);
          router.push("/chat");
        } else {
          toast.info(response.msg);
        }
      }
    } catch {
      toast.error("something went wrong, please try again later");
      console.log(error);
    }
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
          <InputText
            id="occupation"
            onChange={onChange}
            inputType="text"
            label="Occupation"
            value={input.occupation}
          />
          <div className="horizontaldiv">
            <InputText
              id="age"
              onChange={onChange}
              inputType="number"
              label="Age"
              value={input.age}
              max={99}
              min={16}
              warning={"invalid age"}
            />
            <SelectBox
              id="gender"
              name="gender"
              onChange={selectHandler}
              label={"Gender"}
              options={["male", "female"]}
            />
          </div>
          <InputText
            id="password"
            onChange={onChange}
            inputType="password"
            label="Password"
            password={true}
            value={input.password}
            minLength={8}
            maxLength={22}
            warning={"invalid password formate"}
          />
          <InputText
            id="confirm_password"
            onChange={onChange}
            inputType="password"
            label="Confirm Password"
            password={true}
            value={input.confirm_password}
          />
          <PrimaryButton
            name={"Submit"}
            onClick={submitHandler}
            style={{ marginTop: "10px" }}
            isDisable={loading || !validateInputs}
            isLoading={loading}
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
  }, [input, loading]);

  if (pageLoading) {
    return <SplashScreen />;
  } else {
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
  }
};

export default Signup;
