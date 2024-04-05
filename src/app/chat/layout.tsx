import Navbar from "@/components/navbar/Navbar";
import Sidenav from "@/components/sidenav/Sidenav";
import React from "react";
import "./index.scss";

type Props = {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: Props) => {
  return (
    <div className="chat_layout">
      <Sidenav />
      <div className="chat_layout__main">
        <Navbar />
        <div className="chat_layout__main__screen">{children}</div>
      </div>
    </div>
  );
};

export default ChatLayout;
