import { Card, Typography } from "antd";
import React from "react";

const style = { width: "24%" };
const MacroDataCard = ({ title, children }) => {
  return (
    <Card title={title} style={style}>
      <Typography.Text>{children}</Typography.Text>
    </Card>
  );
};

export default MacroDataCard;
