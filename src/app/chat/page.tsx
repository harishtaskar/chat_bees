"use client";
import "./index.scss";
import Logo from "@/components/shared/Logo";
import LoaderBar from "@/components/shared/LoaderBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Chat = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/chat/messages`);
  }, []);

  return (
    <div className="body" style={{ height: "95vh" }}>
      <Logo />
      <LoaderBar />
    </div>
  );
};

export default Chat;
