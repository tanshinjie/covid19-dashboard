import React from "react";
import LineChart from "./LineChart";
import _ from "lodash";
import { ContentContainer } from "../Styles";

const PastData = ({ covidData, showTotalCases, showTotalDeaths }) => {
  const data = covidData.data;

  const newCasesDirty = _.map(data, (obj) => _.pick(obj, ["date", "newCases"]));
  const totalCasesDirty = _.map(data, (obj) =>
    _.pick(obj, ["date", "totalCases"])
  );
  const newDeathsDirty = _.map(data, (obj) =>
    _.pick(obj, ["date", "newDeaths"])
  );
  const totalDeathsDirty = _.map(data, (obj) =>
    _.pick(obj, ["date", "totalDeaths"])
  );
  const newCases = newCasesDirty.map((p) => {
    const date = new Date(p.date);
    return {
      x: date,
      y: p.newCases || 0,
    };
  });
  const newDeaths = newDeathsDirty.map((p) => {
    const date = new Date(p.date);
    return {
      x: date,
      y: p.newDeaths || 0,
    };
  });
  const totalCases = totalCasesDirty.map((p) => {
    const date = new Date(p.date);
    return {
      x: date,
      y: p.totalCases || 0,
    };
  });
  const totalDeaths = totalDeathsDirty.map((p) => {
    const date = new Date(p.date);
    return {
      x: date,
      y: p.totalDeaths || 0,
    };
  });
  const caseData = { daily: newCases, cumulative: totalCases };
  const deathData = { daily: newDeaths, cumulative: totalDeaths };
  return (
    <ContentContainer>
      {showTotalCases && <LineChart data={caseData} title={"Total Cases"} />}
      {showTotalDeaths && <LineChart data={deathData} title={"Total Deaths"} />}
    </ContentContainer>
  );
};

export default PastData;
