import React from "react";
import "./index.scss";
import UserComponent from "../user/UserComponent";

type Props = {
  user: any;
};

const ChatNavbar = ({ user }: Props) => {
  return (
    <div className="chat_navbar">
      {
        <UserComponent
          iconIndex={user.iconIndex}
          isActive={false}
          username={user.username}
          designation={user.designation}
        />
      }
    </div>
  );
};

export default ChatNavbar;
