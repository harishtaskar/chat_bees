import { socketAtom } from "@/state/SocketProvider";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { Socket } from "socket.io-client";

interface ISocketContext {
  sendMessage: (msg: string) => any;
  messages: string[];
}

const useSocket = () => {
  //@ts-ignore
  const socket = useRecoilValue<Socket>(socketAtom);
  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      if (socket) {
        socket.emit("event:message", { message: msg });
      }
    },
    [socket]
  );
  return { sendMessage };
};

export default useSocket;
