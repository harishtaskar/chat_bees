"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Socket, io } from "socket.io-client";
import {
  activeUserAtom,
  connectionsAtom,
  messagesAtom,
  msgCountAtom,
  userAtom,
} from "./Atom";

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

const URL = process.env.SERVER_URL || "https://chat-bees-backend.onrender.com";

const SocketProvider = ({ children }: SocketProvider) => {
  const user = useRecoilValue(userAtom);
  const setMessages = useSetRecoilState<any[]>(messagesAtom);
  //@ts-ignore
  const [socket, setSocket] = useState<Socket>();
  const connections = useRecoilValue(connectionsAtom);
  const [msgCount, setMsgCount] = useRecoilState(msgCountAtom);
  const activeUser = useRecoilValue(activeUserAtom);

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      if (socket) {
        socket.emit("event:message", msg);
      }
    },
    [socket]
  );

  const updateMessageCount = useCallback(
    (message: IMessage) => {
      setMsgCount((prevMsgCount) => {
        const msgCounts = prevMsgCount.filter(
          (msgC) => msgC.conversation === message.conversation_id
        );

        if (msgCounts.length > 0) {
          return prevMsgCount.map((msgC) => {
            if (
              message.from_user === msgC.user &&
              message.conversation_id === msgC.conversation
            ) {
              return {
                ...msgC,
                msg_count: msgC.msg_count + 1,
                unread_msg_count:
                  activeUser?.conversation !== message.conversation_id
                    ? msgC.unread_msg_count + 1
                    : 0,
              };
            }
            return msgC;
          });
        } else {
          const newMsgCount: IMessageCount = {
            conversation: message.conversation_id,
            msg_count: 1,
            unread_msg_count: 1,
            user: message.from_user,
          };
          return [...prevMsgCount, newMsgCount];
        }
      });
    },
    [msgCount, activeUser, setMsgCount]
  );

  const onMessageRec = useCallback(
    (msg: string) => {
      const message = JSON.parse(msg) as IMessage;
      setMessages((prev) => [
        ...prev,
        {
          ...message,
        },
      ]);
      updateMessageCount(message);
    },
    [updateMessageCount]
  );

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
