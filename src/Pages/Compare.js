import React, { useState, useEffect } from "react";
import { Table, Select, Typography } from "antd";
import { numberWithCommas } from "../Utils";
import _ from "lodash";
import "../App.css";
import { columns } from "../config";
import { Container } from "../Components/Styles";

const { Option } = Select;
const { Paragraph, Text } = Typography;

const Compare = ({ currentCountry, statsData, countryList }) => {
  const [host, setHost] = useState(null);
  const [guests, setGuests] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const options = countryList.map((c) => (
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
  }, [host, guests, currentCountry]);

  useEffect(() => {
    console.log("useEffect shouldUpdate", shouldUpdate);
    if (shouldUpdate) {
      const hostData = statsData[host];
      const hostReformatData = _.assign(
        _.pick(hostData, [...columns.map((c) => c.key)])
      );
      console.log(hostReformatData);
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
        const guestData = statsData[country];

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
  }, [shouldUpdate, host, guests, statsData]);

  const handleChange = (value) => {
    setGuests([...value]);
    setShouldUpdate(true);
  };

  return (
    <Container>
      <Paragraph>
        Comparing <Text strong={true}>{host}</Text> with:{" "}
      </Paragraph>
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
        rowClassName={(record) => (record.country === host ? "host-row" : "")}
        rowKey={(record) => record.country}
        scroll={{ y: 500 }}
      />
    </Container>
  );
};

export default Compare;
