import React from "react";
import InputText from "../shared/inputText";
import "./index.scss";

type Props = {};

const InputComponent = (props: Props) => {
  return (
    <div className="input">
      <InputText
        id="input"
        onChange={() => {}}
        placeHolder="Type a message..."
        require={false}
        style={{ backgroundColor: "var(--white)" }}
      />
      <button className="input__send_btn">
        <i className="ri-send-plane-fill ri-xl" />
      </button>
    </div>
  );
};

export default InputComponent;
