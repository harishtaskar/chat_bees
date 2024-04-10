"use client";
import { userAtom } from "@/state/Atom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function Home() {
  const user: IUser | any = useRecoilValue(userAtom);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/chat");
    } else {
      router.push("/signin");
    }
  }, []);
}
