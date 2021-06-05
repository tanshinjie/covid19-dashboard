import React, { useState, useEffect } from "react";
import { Table, Select } from "antd";
import worldStats from "../Data/world-stats.json";
import {
  keysToCamel,
  getAllCountryNameByKey,
  numberWithCommas,
} from "../Utils";
import _ from "lodash";
import "../App.css";
import { columns } from "../config";

const { Option } = Select;

const Compare = ({ currentCountry }) => {
  const [host, setHost] = useState(null);
  const [guests, setGuests] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const allData = keysToCamel(worldStats);

  const countries = [
    ...getAllCountryNameByKey(worldStats, "Country").slice(
      2,
      worldStats.length - 1
    ),
  ].sort();

  const options = countries.map((c) => (
    <Option key={c} value={c} disabled={c === host}>
      {c}
    </Option>
  ));
  useEffect(() => {
    console.log("useEffect host !== currentCountry", host !== currentCountry);
    if (host !== currentCountry) {
      setHost(currentCountry);
      setShouldUpdate(true);
    }
  }, [host, currentCountry]);

  useEffect(() => {
    console.log("useEffect shouldUpdate", shouldUpdate);
    if (shouldUpdate) {
      const hostData = allData.find((d) => d.country === host);
      const hostReformatData = _.assign(
        _.pick(hostData, [...columns.map((c) => c.key)])
      );
      for (const key in hostReformatData) {
        if (key !== "country") {
          hostReformatData[key] = numberWithCommas(
            parseInt(hostReformatData[key])
          );
        }
      }

      const newGuestsReformatData = [];

      for (let i = 0; i < guests.length; i++) {
        const country = guests[i];
        const guestData = allData.find((d) => d.country === country);

        const dataReformat = _.assign(
          _.pick(guestData, [...columns.map((c) => c.key)]),
          {
            key: guestData.threeLetterSymbol,
          }
        );
        for (const key in dataReformat) {
          if (key !== "country") {
            dataReformat[key] = numberWithCommas(parseInt(dataReformat[key]));
          }
        }

        newGuestsReformatData.push(dataReformat);
      }
      const newTableData = [hostReformatData, ...newGuestsReformatData];
      setShouldUpdate(false);
      setTableData(newTableData);
    }
  }, [shouldUpdate, host, guests, allData]);

  const handleChange = (value) => {
    setGuests([...value]);
    setShouldUpdate(true);
  };

  return (
    <div>
      <p>Data Source = VACCOVID - coronavirus, vaccine and treatment tracker</p>
      <p>Compare with: </p>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="select one or more countries to compare with"
        onChange={handleChange}
        optionLabelProp="label"
      >
        {options}
      </Select>
      <Table
        bordered={true}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowClassName={(record) =>
          record.country === host ? "host-row" : "guest-row"
        }
        rowKey={(record) => record.country}
      />
    </div>
  );
};

export default Compare;
