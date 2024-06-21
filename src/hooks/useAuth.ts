"use client";
import { userAtom } from "@/state/Atom";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import useNetwork from "./useNetwork";

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const setUser = useSetRecoilState(userAtom);
  const router = useRouter();
  const { getRequest } = useNetwork();

  const loginUser = useCallback((token: string, user: any) => {
    console.log("token response==>", token);
    console.log("user response==>", user);
    try {
      if (token) {
        localStorage.setItem("Authorization", `Bearer ${token}`);
        setUser(user);
        router.push("/chat");
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
          if (response.res === "ok") {
            setUser(response.user);
            console.log(response.user);
            if (redirectToSignin) {
              router.push("/chat");
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
