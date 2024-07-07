"use client";
import ChatCanvas from "@/components/chat/ChatCanvas";
import InputComponent from "@/components/chat/InputComponent";
import ChatNavbar from "@/components/navbar/ChatNavbar";
import {
  connectionsAtom,
  messagesAtom,
  msgCountAtom,
  userAtom,
} from "@/state/Atom";
import { useSocket } from "@/state/SocketProvider";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import illustration from "@/assets/images/Illustration.svg";
import "../../index.scss";
import useFetch from "@/hooks/useFetch";

type Props = {};

const UserMessages = (props: Props) => {
  const { conversationId } = useParams();
  const { sendMessage } = useSocket();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const user: IUser | undefined = useRecoilValue(userAtom);
  const connections: any = useRecoilValue(connectionsAtom);
  const [activeUser, setActiveUser] = useState<any>(undefined);
  const [msgCounts, setMsgCounts] = useRecoilState(msgCountAtom);

  const { loading: messageLoading, fetchMessages } = useFetch();

  const fetchMsg = async () => {
    const messages = await fetchMessages(conversationId.toString());
    setMessages(messages);
  };

  const updateMessageCounts = () => {
    const updatedMsgCounts = msgCounts.map((msgC) => {
      if (msgC.conversation === conversationId) {
        return {
          ...msgC,
          unread_msg_count: 0,
        };
      }
      return msgC;
    });
    setMsgCounts(updatedMsgCounts);
  };

  useEffect(() => {
    setActiveUser(
      connections?.filter(
        (user: any) => user?.conversation === conversationId
      )[0]
    );
    updateMessageCounts();
    fetchMsg();
  }, [connections]);

  const inputChangeHandler = useCallback((id: string, value: string) => {
    setMessage(value);
  }, []);

  const sendInputMessage = useCallback(() => {
    const userId = global.window.localStorage.getItem("user_id");
    if (message?.trim() !== "") {
      sendMessage({
        content: message,
        from_user: user?._id || userId,
        conversation_id: activeUser?.conversation,
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
    <>
      {activeUser ? (
        <div className="chat_canvas">
          <ChatNavbar user={activeUser} />
          <ChatCanvas
            messages={messages}
            conversation={`${conversationId}`}
            isLoading={messageLoading}
          />
          <InputComponent
            onChange={inputChangeHandler}
            onSendMsg={sendMsgHandler}
            value={message}
            onKeyDown={keyDownHandler}
          />
        </div>
      ) : (
        <>
          <div className="chat__chat_container__left">
            <span className="chat__chat_container__left__text">
              Oop&apos;s User Not Found!
            </span>
            <Image
              src={illustration}
              width={480}
              height={480}
              alt="illustartion"
            />
          </div>
        </>
      )}
    </>
  );
};

export default UserMessages;
