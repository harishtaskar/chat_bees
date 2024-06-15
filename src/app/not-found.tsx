"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PageNotFound() {
  const router = useRouter();
  useEffect(() => {
    router.push("/user/signin");
  }, []);
  return <h1>404 - Page Not Found</h1>;
}
