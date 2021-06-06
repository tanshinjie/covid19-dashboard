import React from "react";
import styled from "styled-components";
import { Spin } from "antd";

const Loading = () => {
  return (
    <Backdrop>
      <Spin size={"large"} tip="Loading the world's COVID 19 data..."></Spin>
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
