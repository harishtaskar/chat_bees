import React from "react";
import "./index.scss";
import UserComponent from "../user/UserComponent";

type Props = {
  user: IUser;
};

const ChatNavbar = ({ user }: Props) => {
  return (
    <div className="chat_navbar">
      {
        <UserComponent
          user={user}
          isActive={false}
        />
      }
    </div>
  );
};

export default ChatNavbar;
