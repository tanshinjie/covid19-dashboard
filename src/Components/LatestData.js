import React from "react";
import MacroDataCard from "./MacroDataCard";
import { Typography } from "antd";
import { ContentContainer, FlexBox } from "../Styles";

const LatestData = ({ latestCovidData, statsDataSrc }) => {
  const { lastUpdatedDate } = latestCovidData;
  const newCases =
    latestCovidData.newCases === null ? "No data" : latestCovidData.newCases;
  const activeCases =
    statsDataSrc.activeCases === null ? "No data" : statsDataSrc.activeCases;
  const newRecovered =
    statsDataSrc.newRecovered === null ? "No data" : statsDataSrc.newRecovered;
  const newDeaths =
    latestCovidData.newDeaths === null ? "No data" : latestCovidData.newDeaths;

  return (
    <ContentContainer>
      <Typography.Title
        level={4}
        style={{ display: "inline-block", marginRight: "1rem" }}
      >
        Daily Update
      </Typography.Title>
      <Typography.Title
        level={5}
        style={{ display: "inline-block", marginRight: "1rem" }}
      >
        {lastUpdatedDate}
      </Typography.Title>
      <FlexBox>
        <MacroDataCard title={"Active Cases"}>{activeCases}</MacroDataCard>
        <MacroDataCard title={"New Cases"}>{newCases}</MacroDataCard>
        <MacroDataCard title={"New Deaths"}>{newDeaths}</MacroDataCard>
        <MacroDataCard title={"New Recovered"}>{newRecovered}</MacroDataCard>
      </FlexBox>
    </ContentContainer>
  );
};

export default LatestData;
