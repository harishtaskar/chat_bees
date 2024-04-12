"use client";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

export default function Home() {
  const { authorizeUser } = useAuth();
  useEffect(() => {
    authorizeUser();
  }, []);
}
