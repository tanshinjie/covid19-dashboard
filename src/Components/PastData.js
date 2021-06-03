import { Typography } from "antd";
import React from "react";
import LineChart from "./LineChart";
import _ from "lodash";

const PastData = ({ covidData, showTotalCases, showTotalDeath }) => {
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
    <>
      <Typography.Title level={3}>
        {showTotalCases && <LineChart data={caseData} title={"Total Cases"} />}
        {showTotalDeath && (
          <LineChart data={deathData} title={"Total Deaths"} />
        )}
      </Typography.Title>
    </>
  );
};

export default PastData;
