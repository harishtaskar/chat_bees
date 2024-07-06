import React from "react";
import "./index.scss";

type Props = {
  message: any;
  userId: string;
  key: number;
};

const ChatDiv = ({ message, key, userId }: Props) => {
  return (
    <div key={key} className="chat_msg">
      {message?.from_user === userId ? (
        <div className={"chat_msg__div_self"}>
          <span className={"chat_msg__div_self__date"}>{message.date}</span>
          <div className={`chat_msg__div_self__message`}>
            {message.content}{" "}
            <span className={"chat_msg__div_self__time"}>{message.time}</span>
          </div>
        </div>
      ) : (
        <div className={"chat_msg__div_other"}>
          <span className={"chat_msg__div_other__date"}>{message.date}</span>
          <div className={`chat_msg__div_other__message`}>
            {message.content}{" "}
            <span className={"chat_msg__div_other__time"}>{message.time}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDiv;
