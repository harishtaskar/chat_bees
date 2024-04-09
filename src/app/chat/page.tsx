"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./index.scss";
import users from "@/assets/jsons/users.json";
import ChatNavbar from "@/components/navbar/ChatNavbar";
import InputComponent from "@/components/chat/InputComponent";
import ChatCanvas from "@/components/chat/ChatCanvas";
import { messagesAtom } from "@/state/SocketProvider";
import { useRecoilState } from "recoil";
import { currentDateTime } from "../utils/DateTime";
import ChatMessages from "@/components/chat/ChatMessages";
import useValidation from "@/hooks/useValidation";

type Props = {};

const Chat = ({}: Props) => {
  const { deviceValidation } = useValidation();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const [active, setActive] = useState<string>(users[0]?.id);
  const { date, time } = currentDateTime();
  const activeUser = useMemo(() => {
    return users?.filter((item) => {
      return item?.id === active;
    });
  }, [active]);

  useEffect(() => {
    deviceValidation();
  }, []);

  const inputChangeHandler = useCallback((id: string, value: string) => {
    setMessage(value);
  }, []);

  const sendInputMessage = useCallback(() => {
    if (message) {
      setMessages((prev) => [
        ...prev,
        {
          self: message?.length % 2 === 0,
          message: message,
          time: time,
          date: date,
        },
      ]);
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

  const userClickHandler = useCallback((id: string) => {
    setActive(id);
  }, []);

  return (
    <div className="chat">
      <div className={"chat__message_container"}>
        <ChatMessages
          users={users}
          active={active}
          onUserClick={userClickHandler}
        />
      </div>
      <div className="chat__chat_container">
        <ChatNavbar user={activeUser[0]} />
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
