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
          id={user.id}
          iconIndex={user.iconIndex}
          isActive={false}
          username={user.username}
          designation={user.designation}
          gender={user.gender}
          age={user.age}
        />
      }
    </div>
  );
};

export default ChatNavbar;
