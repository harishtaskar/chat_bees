"use client";
import React, { useMemo } from "react";
import "../index.scss";
import useAuth from "@/hooks/useAuth";
import SplashScreen from "../loading";
import { useEffect } from "react";
import Logo from "@/components/shared/Logo";
import illustration from "../../assets/images/Illustration.svg";
import Image from "next/image";
import Card from "@/components/shared/Card";
import Theme from "@/components/shared/Theme";
type Props = {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: Props) => {
  const { authorizeUser, loading } = useAuth();

  useEffect(() => {
    authorizeUser();
  }, []);
  if (loading) {
    return <SplashScreen />;
  } else {
    return (
      <div className="init">
        <div className="init__left">
          <div className="page__logo">
            <span className="init__left__text">Welcome to</span>
            <Logo />
          </div>
          <Image
            src={illustration}
            width={480}
            height={480}
            alt="illustartion"
          />
        </div>
        {children}
      </div>
    );
  }
};

export default ChatLayout;
