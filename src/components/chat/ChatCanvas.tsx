"use client";
import React, { useRef, useEffect } from "react";
import ChatDiv from "./ChatDiv";
import LoaderBar from "../shared/LoaderBar";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/state/Atom";

type Props = {
  messages: any;
  isLoading: boolean;
};

const ChatCanvas = ({ messages, isLoading }: Props) => {
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const canvasRef = document.getElementById("canvas");
    //@ts-ignore
    canvasRef.scrollTop = canvasRef?.scrollHeight;
  }, [messages]);

  return (
    <div className="canvas" id="canvas">
      {isLoading ? (
        <LoaderBar />
      ) : (
        messages?.map((item: any, index: number) => {
          return (
            <ChatDiv message={item} key={index} userId={user?._id || ""} />
          );
        })
      )}
    </div>
  );
};

export default ChatCanvas;
