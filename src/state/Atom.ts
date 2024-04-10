import { atom } from "recoil";

export const modalAtom = atom({
  key: "modal",
  default: "",
});

export const userAtom = atom({
  key: "userAtom",
  default: "undefined",
});

export const userProfileAtom = atom({
  key: "userProfileAtom",
  default: {
    id: "",
    username: "",
    designation: "",
    age: 0,
    gender: "",
    iconIndex: 0,
  },
});
