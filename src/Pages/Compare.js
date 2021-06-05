import React, { useState } from "react";
import { Table, Tag, Space } from "antd";

const Compare = ({ currentCountry }) => {
  const [host, setHost] = useState(currentCountry);
  const [guests, setGuests] = useState([]);

  const data = [];

  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Population",
      dataIndex: "population",
      key: "population",
    },
    {
      title: "Total Test",
      dataIndex: "totalTest",
      key: "totalTest",
    },
    {
      title: "Infection Risk",
      dataIndex: "infectionRisk",
      key: "infectionRisk",
    },
    {
      title: "Case Fatality Rate",
      dataIndex: "caseFatalityRate",
      key: "caseFatalityRate",
    },
    {
      title: "Test Percentage",
      dataIndex: "testPercentage",
      key: "testPercentage",
    },
    {
      title: "Recovery Proportion",
      dataIndex: "recoveryProportion",
      key: "recoveryProportion",
    },
    {
      title: "Total Cases",
      dataIndex: "totalCases",
      key: "totalCases",
    },
    {
      title: "Total Deaths",
      dataIndex: "totalDeaths",
      key: "totalDeaths",
    },
    {
      title: "Total Recovered",
      dataIndex: "totalRecovered",
      key: "totalRecovered",
    },
    {
      title: "One Case Every X Ppl",
      dataIndex: "oneCaseEveryXPpl",
      key: "oneCaseEveryXPpl",
    },
    {
      title: "One Death Every X Ppl",
      dataIndex: "oneDeathEveryXPpl",
      key: "oneDeathEveryXPpl",
    },
    {
      title: "Death 1M Pop",
      dataIndex: "Death1MPop",
      key: "Death1MPop",
    },
    {
      title: "Test 1M Pop",
      dataIndex: "Test1MPop",
      key: "Test1MPop",
    },
    {
      title: "Total Case 1M Pop",
      dataIndex: "totalCase1MPop",
      key: "totalCase1MPop",
    },
  ];

  return (
    <div>
      <p>API Source = VACCOVID - coronavirus, vaccine and treatment tracker</p>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default Compare;
