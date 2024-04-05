"use client";
import React from "react";
import { RecoilRoot } from "recoil";

type RecoilRootProvider = {
  children: React.ReactNode;
};

const RecoilRootProvider = ({ children }: RecoilRootProvider) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootProvider;
