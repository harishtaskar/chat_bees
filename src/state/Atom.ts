import { atom } from "recoil";

export const modalAtom = atom({
  key: "modal",
  default: "hello",
});

export const messagesAtom = atom<any[]>({
  key: "message-atom",
  default: [],
});

export const userAtom = atom<IUser | undefined>({
  key: "userAtom",
  default: undefined,
});

export const allUsersAtom = atom<IUser[] | undefined>({
  key: "all-user-atom",
  default: [],
});

//user which is currently chating with us
export const activeUserAtom = atom<IUser | undefined>({
  key: "activeUserAtom",
  default: undefined,
});

export const userProfileAtom = atom<IUser | undefined>({
  key: "userProfileAtom",
  default: undefined,
});
