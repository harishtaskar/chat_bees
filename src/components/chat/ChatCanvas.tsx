"use client";
import React, { useRef, useEffect } from "react";
import ChatDiv from "./ChatDiv";

type Props = {
  messages: any;
};

const ChatCanvas = ({ messages }: Props) => {
  useEffect(() => {
    const canvasRef = document.getElementById("canvas");
    //@ts-ignore
    canvasRef.scrollTop = canvasRef?.scrollHeight;
  }, [messages]);

  return (
    <div className="canvas" id="canvas">
      {messages?.map((item: any, index: number) => {
        return <ChatDiv message={item} key={index} />;
      })}
    </div>
  );
};

export default ChatCanvas;
