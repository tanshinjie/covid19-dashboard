import { Card, Typography } from "antd";
import React from "react";

const style = {
  flexGrow: "1",
  minWidth: "100px",
  border: "0.5px solid #69c0ff",
  margin: "0 0.5rem",
};

const MacroDataCard = ({ title, children }) => {
  return (
    <Card title={title} style={style} bordered={false}>
      <Typography.Text strong={true}>{children}</Typography.Text>
    </Card>
  );
};

export default MacroDataCard;
