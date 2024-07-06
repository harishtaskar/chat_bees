import { atom } from "recoil";

export const modalAtom = atom({
  key: "modal",
  default: "hello",
});

export const messagesAtom = atom<IMessage[]>({
  key: "message-atom",
  default: [],
});

export const userAtom = atom<IUser | undefined>({
  key: "userAtom",
  default: undefined,
});

export const allUsersAtom = atom<IUser[] | undefined>({
  key: "all-user-atom",
  default: undefined,
});

export const connectionsAtom = atom<any>({
  key: "connections-atom",
  default: undefined,
});

export const recallConnectionAPI = atom<boolean>({
  key: "recall-connection-api",
  default: false,
});

//user which is currently chating with us
export const activeUserAtom = atom<IUser | undefined | any>({
  key: "activeUserAtom",
  default: undefined,
});

export const userProfileAtom = atom<IUser | undefined>({
  key: "userProfileAtom",
  default: undefined,
});

export const themeAtom = atom<string>({
  key: "themeAtom",
  default: "light",
});

export const msgCountAtom = atom<IMessageCount[]>({
  key: "msgCountAtom",
  default: [],
});
