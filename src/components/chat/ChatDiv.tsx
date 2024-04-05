import React from "react";

type Props = {
  message: any;
  key: number;
};

const ChatDiv = ({ message, key }: Props) => {
  console.log(message);

  return (
    <div key={key} className="chat_msg">
      {message.self ? (
        <div className={"chat_msg__div_self"}>
          <span className={"chat_msg__div_self__date"}>{message.date}</span>
          <div className={`chat_msg__div_self__message`}>
            {message.message}{" "}
            <span className={"chat_msg__div_self__time"}>{message.time}</span>
          </div>
        </div>
      ) : (
        <div className={"chat_msg__div_other"}>
          <span className={"chat_msg__div_other__date"}>{message.date}</span>
          <div className={`chat_msg__div_other__message`}>
            {message.message}{" "}
            <span className={"chat_msg__div_other__time"}>{message.time}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDiv;
