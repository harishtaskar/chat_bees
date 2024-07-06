import "../index.scss";
import Image from "next/image";
import illustration from "@/assets/images/Illustration.svg";

type Props = {};

const Messages = ({}: Props) => {
  return (
    <div className="chat__chat_container">
      <div className="chat__chat_container__left">
        <span className="chat__chat_container__left__text">
          Let&apos;s Chat
        </span>
        <Image src={illustration} width={480} height={480} alt="illustartion" />
      </div>
    </div>
  );
};

export default Messages;
