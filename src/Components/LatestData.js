import React from "react";
import MacroDataCard from "./MacroDataCard";
import styled from "styled-components";
import { Typography } from "antd";

const LatestData = ({ latestCovidData }) => {
  console.log(latestCovidData);
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
        {latestCovidData.lastUpdate}
      </Typography.Title>
      <MacroDataContainer>
        <MacroDataCard title={"Active Cases"}>
          {!latestCovidData.activeCasesText
            ? 0
            : latestCovidData.activeCasesText}
        </MacroDataCard>
        <MacroDataCard title={"New Cases"}>
          {!latestCovidData.newCasesText ? 0 : latestCovidData.newCasesText}
        </MacroDataCard>
        <MacroDataCard title={"New Deaths"}>
          {!latestCovidData.newDeathsText ? 0 : latestCovidData.newDeathsText}
        </MacroDataCard>
        <MacroDataCard title={"New Recovered"}>
          {latestCovidData.totalRecoveredText
            ? 0
            : latestCovidData.totalRecoveredText}
        </MacroDataCard>
      </MacroDataContainer>
    </div>
  );
};

export default LatestData;

const MacroDataContainer = styled.div`
  display: flex;
`;
