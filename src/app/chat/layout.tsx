import Navbar from "@/components/navbar/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default ChatLayout;
