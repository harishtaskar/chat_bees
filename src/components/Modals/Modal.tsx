import React, { CSSProperties, MouseEventHandler, ReactElement } from "react";
import "./index.scss";

type Props = {
  body: ReactElement;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  closeBtn?: boolean;
  modalstyle?: CSSProperties;
  backgroundstyle?: CSSProperties;
};

const Modal = ({
  body,
  onClose,
  closeBtn = true,
  backgroundstyle,
  modalstyle,
}: Props) => {
  return (
    <div className={"background"} style={backgroundstyle}>
      <div className={"background__modal"} style={modalstyle}>
        {closeBtn && (
          <button
            className={"background__modal__close-btn-user"}
            onClick={onClose}
          >
            <i className="ri-close-line ri-xl"></i>
          </button>
        )}
        <>{body}</>
      </div>
    </div>
  );
};

export default Modal;
