import React, { ReactNode } from "react";
import "./index.scss";

type Props = {
  body: ReactNode;
};

const MessagesPopup = ({ body }: Props) => {
  return <div className="popup">{body}</div>;
};

export default MessagesPopup;
