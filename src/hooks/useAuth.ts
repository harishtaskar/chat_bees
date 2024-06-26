"use client";
import { themeAtom, userAtom } from "@/state/Atom";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import useNetwork from "./useNetwork";

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const setUser = useSetRecoilState(userAtom);
  const router = useRouter();
  const setTheme = useSetRecoilState(themeAtom);
  const { getRequest } = useNetwork();

  const loginUser = useCallback((token: string, user: any) => {
    try {
      if (token) {
        localStorage.setItem("Authorization", `Bearer ${token}`);
        setUser(user);
        router.push("/chat/messages");
      } else {
        localStorage.setItem("Authorization", "");
        router.push("/user/signin");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const authorizeUser = useCallback((redirectToSignin = true) => {
    const token = global.window.localStorage.getItem("Authorization");
    if (token) {
      const fetchUser = async (token: string) => {
        try {
          const response = await getRequest("/user", {
            Authorization: token,
          });
          if (response?.res === "ok") {
            setUser(response?.user);
            setTheme(response?.user?.theme);
            if (redirectToSignin) {
              router.push("/chat/messages");
              setLoading(false);
            }
          } else {
            setUser(undefined);
            if (redirectToSignin) {
              router.push("/user/signin");
              setLoading(false);
            }
          }
        } catch (error) {
          setLoading(false);
          setUser(undefined);
          if (redirectToSignin) {
            router.push("/user/signin");
            setLoading(false);
          }
        }
      };
      fetchUser(token);
    } else {
      setLoading(false);
      if (redirectToSignin) {
        router.push("/user/signin");
        setLoading(false);
      }
    }
  }, []);

  return { loginUser, authorizeUser, loading };
};

export default useAuth;
