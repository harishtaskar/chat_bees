import "../index.scss";
import ChatMessages from "@/components/chat/ChatMessages";

type Props = { children: React.ReactNode };

const MessagesLayout = ({ children }: Props) => {
  return (
    <div className="chat">
      <div className={"chat__message_container"}>
        <ChatMessages />
      </div>
      {children}
    </div>
  );
};

export default MessagesLayout;
