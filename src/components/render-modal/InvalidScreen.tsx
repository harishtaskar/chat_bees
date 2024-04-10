import React from "react";
import Modal from "../Modals/Modal";

type Props = {};

const InvalidScreen = ({}: Props) => {
  return (
    <Modal
      closeBtn={false}
      body={
        <div
          style={{
            margin: "10px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {" "}
          <span>
            <i className="ri-error-warning-fill" style={{ color: "red" }} />{" "}
            Invalid Device
          </span>
          <p style={{ textAlign: "center", margin: "8px 0px" }}>
            The screen size of your device is too small for this website
          </p>
        </div>
      }
      modalstyle={{ margin: "0px 20px" }}
    />
  );
};

export default InvalidScreen;
