"use client";
import React, { useRef, useEffect } from "react";
import ChatDiv from "./ChatDiv";
import LoaderBar from "../shared/LoaderBar";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/state/Atom";

type Props = {
  messages: any;
  isLoading: boolean;
  conversation: string;
};

const ChatCanvas = ({ messages, isLoading, conversation }: Props) => {
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const canvasRef = document.getElementById("canvas");
    //@ts-ignore
    canvasRef.scrollTop = canvasRef?.scrollHeight;
  }, [messages]);

  return (
    <div className="canvas" id="canvas">
      {isLoading ? (
        <div className="loading_chat_screen">
          <LoaderBar />
        </div>
      ) : (
        messages?.map((item: any, index: number) => {
          if (conversation === item?.conversation_id) {
            return (
              <ChatDiv message={item} key={index} userId={user?._id || ""} />
            );
          }
        })
      )}
    </div>
  );
};

export default ChatCanvas;
