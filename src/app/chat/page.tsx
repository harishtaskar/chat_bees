"use client";
import React, { useCallback, useEffect, useState } from "react";
import "./index.scss";
import users from "@/assets/jsons/users.json";
import ChatNavbar from "@/components/navbar/ChatNavbar";
import InputComponent from "@/components/chat/InputComponent";
import ChatCanvas from "@/components/chat/ChatCanvas";
import { messagesAtom } from "@/state/Atom";
import { useRecoilState } from "recoil";
import ChatMessages from "@/components/chat/ChatMessages";
import { activeUserAtom } from "@/state/Atom";
import { useSocket } from "@/state/SocketProvider";


type Props = {};

const Chat = ({}: Props) => {
  const { sendMessage } = useSocket();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const [activeUser, setActiveUser] = useRecoilState<IUser | undefined>(
    activeUserAtom
  );


  const inputChangeHandler = useCallback((id: string, value: string) => {
    setMessage(value);
  }, []);

  const sendInputMessage = useCallback(() => {
    if (message?.trim() !== "") {
      sendMessage(message);
      setMessage("");
    }
  }, [message]);

  const keyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && e.shiftKey) {
        return;
      } else if (e.key === "Enter") {
        sendInputMessage();
      }
    },
    [message]
  );

  const sendMsgHandler = useCallback(() => {
    sendInputMessage();
  }, [message]);

  const userClickHandler = useCallback((user: IUser) => {
    setActiveUser(user);
  }, []);

 
    return (
      <div className="chat">
        <div className={"chat__message_container"}>
          <ChatMessages
            users={users}
            active={activeUser?.id || users[0].id}
            onUserClick={userClickHandler}
          />
        </div>
        <div className="chat__chat_container">
          <ChatNavbar user={activeUser || users[0]} />
          <ChatCanvas messages={messages} />
          <InputComponent
            onChange={inputChangeHandler}
            onSendMsg={sendMsgHandler}
            value={message}
            onKeyDown={keyDownHandler}
          />
        </div>
      </div>
    );
  
};

export default Chat;
