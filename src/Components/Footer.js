import React from "react";
import { Typography } from "antd";
import { Container } from "./Styles";

const Footer = () => {
  return (
    <Container>
      <Typography.Paragraph style={{ fontSize: "0.8rem" }}>
        Built by&nbsp;
        <Typography.Link href="https://tanshinjie.webflow.io" target="_blank">
          Tan Shin Jie
        </Typography.Link>
      </Typography.Paragraph>
      <Typography.Paragraph style={{ fontSize: "0.8rem" }}>
        Data source:&nbsp;
        <Typography.Link
          href="https://github.com/owid/covid-19-data/tree/master/public/data"
          target="_blank"
        >
          Our World In Data&nbsp;
        </Typography.Link>
        ,
        <Typography.Link
          href="https://github.com/owid/covid-19-data/tree/master/public/data"
          target="_blank"
        >
          Vaccovid API
        </Typography.Link>
      </Typography.Paragraph>
    </Container>
  );
};

export default Footer;
