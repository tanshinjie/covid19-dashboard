import React, { useState } from "react";
import styled from "styled-components";
import { Spin } from "antd";

const Loading = () => {
  const [tipText, setTipText] = useState(
    "Loading the world's COVID 19 data..."
  );
  setTimeout(() => {
    setTipText("Almost there...");
  }, 1000);

  return (
    <Backdrop>
      <Spin size={"large"} tip={tipText} />
    </Backdrop>
  );
};

export default Loading;

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
