"use client";
import { _socket } from "@/app/utils/socket";
import React, { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { Socket } from "socket.io-client";

type SocketProvider = {
  children: React.ReactNode;
};

export const messagesAtom = atom<any[]>({
  key: "message-atom",
  default: [],
});

export const socketAtom = atom({
  key: "socket-atom",
  default: undefined,
});

const SocketProvider = ({ children }: SocketProvider) => {
  const setMessages = useSetRecoilState<any[]>(messagesAtom);
  //@ts-ignore
  const setSocket = useSetRecoilState<Socket | undefined>(socketAtom);

  const onMessageRec = (msg: string) => {
    console.log(`Msg Recieved from Server ${msg}`);
    const { message } = JSON.parse(msg) as { message: string };
    setMessages((prev) => [...prev, message]);
  };

  // useEffect(() => {
  //   setSocket(_socket);
  //   _socket.on("message", onMessageRec);

  //   return () => {
  //     _socket.off("message", onMessageRec);
  //     _socket.disconnect();
  //     setSocket(undefined);
  //   };
  // }, []);

  return <>{children}</>;
};

export default SocketProvider;
