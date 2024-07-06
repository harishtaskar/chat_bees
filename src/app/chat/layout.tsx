"use client";
import Navbar from "@/components/navbar/Navbar";
import Sidenav from "@/components/sidenav/Sidenav";
import React from "react";
import "./index.scss";
import useAuth from "@/hooks/useAuth";
import SplashScreen from "../loading";
import { useEffect } from "react";
type Props = {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: Props) => {
  const { authorizeUser, loading } = useAuth();

  useEffect(() => {
    authorizeUser();
  }, [authorizeUser]);
  if (loading) {
    return <SplashScreen />;
  } else {
    return (
      <div className="chat_layout">
        <Sidenav />
        <div className="chat_layout__main">
          <Navbar />
          <div className="chat_layout__main__screen">{children}</div>
        </div>
      </div>
    );
  }
};

export default ChatLayout;
