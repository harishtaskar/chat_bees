import React from "react";
import InputText from "../shared/inputText";
import "./index.scss";

type Props = {
  onChange: Function;
  onSendMsg: React.MouseEventHandler<HTMLButtonElement>;
  value: string;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
};

const InputComponent = ({ onChange, onSendMsg, value, onKeyDown }: Props) => {
  return (
    <div className="input">
      <InputText
        id="input"
        inputType="text"
        onChange={onChange}
        placeHolder="Type a message..."
        require={false}
        style={{ backgroundColor: "var(--white)" }}
        value={value}
        onKeyDown={onKeyDown}
      />
      <button className="input__send_btn" onClick={onSendMsg}>
        <i className="ri-send-plane-fill ri-xl" />
      </button>
    </div>
  );
};

export default InputComponent;
