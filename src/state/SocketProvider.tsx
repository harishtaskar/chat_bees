"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Socket, io } from "socket.io-client";
import { connectionsAtom, messagesAtom } from "./Atom";
import { currentDateTime } from "@/utils/DateTime";

type SocketProvider = {
  children: React.ReactNode;
};

interface ISocketContext {
  sendMessage: (msg: IMessage) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

const URL = process.env.SERVER_URL || "http://localhost:8080";

const SocketProvider = ({ children }: SocketProvider) => {
  const setMessages = useSetRecoilState<any[]>(messagesAtom);
  //@ts-ignore
  const [socket, setSocket] = useState<Socket>();
  const { date, time } = currentDateTime();
  const connections = useRecoilValue(connectionsAtom);

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      if (socket) {
        socket.emit("event:message", msg);
      }
    },
    [socket]
  );

  const onMessageRec = useCallback((msg: string) => {
    const message = JSON.parse(msg) as IMessage;
    console.log("new msg recieved == ", message);
    setMessages((prev) => [
      ...prev,
      {
        self: true,
        ...message,
      },
    ]);
  }, []);

  const joinRoom = (conversation: string, socket: Socket) => {
    if (conversation !== "") {
      socket.emit("joinConversation", conversation);
    }
  };

  useEffect(() => {
    const _socket: Socket = io(URL);

    console.log("connections inside useEffect==> ", connections);

    if (connections !== undefined && connections?.length > 0) {
      connections?.forEach((connection: any) => {
        joinRoom(connection?.conversation, _socket);
      });
    }

    _socket.on("message", onMessageRec);
    setSocket(_socket);

    return () => {
      _socket.off("message", onMessageRec);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, [connections]);

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
