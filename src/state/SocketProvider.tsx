"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Socket, io } from "socket.io-client";
import { connectionsAtom, messagesAtom, msgCountAtom, userAtom } from "./Atom";

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
  const user = useRecoilValue(userAtom);
  const setMessages = useSetRecoilState<any[]>(messagesAtom);
  const [msgCount, setMsgCount] = useRecoilState(msgCountAtom);
  //@ts-ignore
  const [socket, setSocket] = useState<Socket>();
  const connections = useRecoilValue(connectionsAtom);

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      if (socket) {
        socket.emit("event:message", msg);
      }
    },
    [socket]
  );

  const updateMessageCount = (message: IMessage) => {
    console.log("msgCount==>", msgCount);
    console.log("msg==>", message);
    const msgCounts = msgCount.filter(
      (msgC) => msgC.conversation === message.conversation_id
    );
    if (msgCounts.length) {
      const updatedMsgCount = msgCount.map((msgC) => {
        if (
          message.from_user.equals(msgC.user) &&
          message.conversation_id.equals(msgC.conversation)
        ) {
          return {
            ...msgC,
            msg_count: msgC.msg_count + 1,
            unread_msg_count: msgC.msg_count + 1,
          };
        }
        return msgC;
      });
      setMsgCount(updatedMsgCount);
    } else {
      const newMsgCount: IMessageCount = {
        conversation: message.conversation_id,
        msg_count: 1,
        unread_msg_count: 1,
        user: message.from_user,
      };
      setMsgCount((prev) => [...prev, newMsgCount]);
    }
  };

  const onMessageRec = useCallback((msg: string) => {
    const message = JSON.parse(msg) as IMessage;
    setMessages((prev) => [
      ...prev,
      {
        ...message,
      },
    ]);
    updateMessageCount(message);
  }, []);

  const onJoinConversation = (conversation: string) => {
    console.log("new conv joined==>", conversation);
  };

  const joinRoom = (conversation: string, socket: Socket) => {
    if (conversation !== "") {
      socket.emit("joinConversation", conversation);
    }
  };

  useEffect(() => {
    const _socket: Socket = io(URL);

    if (connections !== undefined && connections?.length > 0) {
      connections?.forEach((connection: any) => {
        joinRoom(connection?.conversation, _socket);
      });
    }

    _socket.on("message", onMessageRec);
    _socket.on("joinConversation", onJoinConversation);
    _socket.emit("userId", user?._id);
    setSocket(_socket);

    return () => {
      _socket.off("joinConversation", onJoinConversation);
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
