"use client";
import React, { useEffect, useState } from "react";

type Props = {};

const ValidateNetwork = ({}: Props) => {
  const [networkStatus, setNetworkStatus] = useState<string>("");

  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus("online");
      setTimeout(() => {
        setNetworkStatus("");
      }, 3000);
    };

    const handleOffline = () => {
      setNetworkStatus("offline");
    };

    // Add event listeners for online and offline events
    global.window?.addEventListener("online", handleOnline);
    global.window?.addEventListener("offline", handleOffline);

    // Cleanup function to remove event listeners
    return () => {
      global.window?.removeEventListener("online", handleOnline);
      global.window?.removeEventListener("offline", handleOffline);
    };
  }, []);

  switch (networkStatus) {
    case "online":
      return (
        <div
          style={{
            position: "absolute",
            top: "0",
            backgroundColor: "var(--green-color)",
            color: "var(--white)",
            width: "100%",
            textAlign: "center",
          }}
        >
          You are Online
        </div>
      );
    case "offline":
      return (
        <div
          style={{
            position: "absolute",
            top: "0",
            backgroundColor: "var(--red-color)",
            color: "var(--white)",
            width: "100%",
            textAlign: "center",
          }}
        >
          You are Offline
        </div>
      );

    default:
      return <></>;
  }
};

export default ValidateNetwork;
