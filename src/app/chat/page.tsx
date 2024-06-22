"use client";
import React, { useCallback, useState } from "react";
import "./index.scss";
// import users from "@/assets/jsons/users.json";
import ChatNavbar from "@/components/navbar/ChatNavbar";
import InputComponent from "@/components/chat/InputComponent";
import ChatCanvas from "@/components/chat/ChatCanvas";
import { messagesAtom } from "@/state/Atom";
import { useRecoilState, useRecoilValue } from "recoil";
import ChatMessages from "@/components/chat/ChatMessages";
import { activeUserAtom } from "@/state/Atom";
import { useSocket } from "@/state/SocketProvider";
import Image from "next/image";
import Logo from "@/components/shared/Logo";
import illustration from "@/assets/images/Illustration.svg";

type Props = {};

const Chat = ({}: Props) => {
  const { sendMessage } = useSocket();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const activeUser: IUser | undefined = useRecoilValue(activeUserAtom);

  const inputChangeHandler = useCallback((id: string, value: string) => {
    setMessage(value);
  }, []);

  const sendInputMessage = useCallback(() => {
    if (message?.trim() !== "") {
      sendMessage({
        content: message,
        from_user: "harish.taskar",
        conversation_id: "6665ec9ab5996575841bc49b",
        status: 1,
        type: "text",
      });
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

  return (
    <div className="chat">
      <div className={"chat__message_container"}>
        <ChatMessages />
      </div>
      <div className="chat__chat_container">
        {activeUser ? (
          <>
            <ChatNavbar user={activeUser} />
            <ChatCanvas messages={messages} />
            <InputComponent
              onChange={inputChangeHandler}
              onSendMsg={sendMsgHandler}
              value={message}
              onKeyDown={keyDownHandler}
            />
          </>
        ) : (
          <div className="chat__chat_container__left">
            <span className="chat__chat_container__left__text">Let's Chat</span>
            <Image
              src={illustration}
              width={480}
              height={480}
              alt="illustartion"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
