import React from "react";
import Modal from "../Modals/Modal";

type Props = {};

const InvalidScreen = ({}: Props) => {
  return (
    <Modal
      closeBtn={false}
      body={<div style={{ margin: "10px" }}>Invalid Device</div>}
      modalstyle={{ margin: "0px 20px" }}
    />
  );
};

export default InvalidScreen;
