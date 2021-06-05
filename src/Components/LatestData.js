import React from "react";
import MacroDataCard from "./MacroDataCard";
import styled from "styled-components";
import { Typography } from "antd";

const LatestData = ({ latestCovidData, statsDataSrc }) => {
  console.log("LatestData", statsDataSrc);
  return (
    <div>
      <Typography.Title
        level={3}
        style={{ display: "inline-block", marginRight: "1rem" }}
      >
        Daily update
      </Typography.Title>
      <Typography.Title
        level={5}
        style={{ display: "inline-block", marginRight: "1rem" }}
      >
        {latestCovidData.lastUpdatedDate}
      </Typography.Title>
      <MacroDataContainer>
        <MacroDataCard title={"Active Cases"}>
          {statsDataSrc.activeCases}
        </MacroDataCard>
        <MacroDataCard title={"New Cases"}>
          {statsDataSrc.newCases}
        </MacroDataCard>
        <MacroDataCard title={"New Deaths"}>
          {statsDataSrc.newDeaths}
        </MacroDataCard>
        <MacroDataCard title={"New Recovered"}>
          {statsDataSrc.newRecovered}
        </MacroDataCard>
      </MacroDataContainer>
    </div>
  );
};

export default LatestData;

const MacroDataContainer = styled.div`
  display: flex;
`;
