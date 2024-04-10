"use client";
import Modal from "@/components/Modals/Modal";
import LoaderBar from "@/components/shared/LoaderBar";
import Logo from "@/components/shared/Logo";
import React, { useMemo } from "react";
import "./index.scss";

const SplashScreen = () => {
  const renderBody = useMemo(() => {
    return (
      <div className="body">
        <Logo />
        <LoaderBar />
      </div>
    );
  }, []);

  return (
    <div className="page">
      <Modal
        body={renderBody}
        closeBtn={false}
        backgroundstyle={{
          width: "100%",
          height: "fit-content",
          backgroundColor: "transparent",
          position: "relative",
        }}
        modalstyle={{
          width: "100%",
          maxWidth: "460px",
          position: "relative",
          borderRadius: "12px",
          margin: "30px 20px",
          border: "none",
        }}
      />
    </div>
  );
};

export default SplashScreen;
