import React, { useState, useEffect } from "react";
import { Table, Select, Typography, Button } from "antd";
import { numberWithCommas, exportAsPng } from "../Utils";
import _ from "lodash";
import "../App.css";
import { columns } from "../Config";
import { Container, FlexSpaceBetween } from "../Styles";

const { Option } = Select;
const { Text } = Typography;

const Compare = ({ currentCountry, latestData, countryList }) => {
  const [host, setHost] = useState(null);
  const [guests, setGuests] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const options = countryList.map((c) => (
    <Option key={c} value={c} disabled={c === host}>
      {c}
    </Option>
  ));
  useEffect(() => {
    if (host !== currentCountry) {
      setHost(currentCountry);
      setShouldUpdate(true);
    }
  }, [host, guests, currentCountry]);

  useEffect(() => {
    if (shouldUpdate) {
      const hostData = latestData[host];
      const hostReformatData = _.assign(
        _.pick(hostData, [...columns.map((c) => c.key)])
      );

      for (const key in hostReformatData) {
        if (key === "location") continue;
        if (key === "lastUpdatedDate") continue;
        hostReformatData[key] = numberWithCommas(
          parseInt(hostReformatData[key])
        );
      }

      const newGuestsReformatData = [];

      for (let i = 0; i < guests.length; i++) {
        const country = guests[i];
        const guestData = latestData[country];

        const dataReformat = _.assign(
          _.pick(guestData, [...columns.map((c) => c.key)]),
          {
            key: guestData.threeLetterSymbol,
          }
        );
        for (const key in dataReformat) {
          if (key === "location") continue;
          if (key === "lastUpdatedDate") continue;
          dataReformat[key] = numberWithCommas(parseInt(dataReformat[key]));
        }

        newGuestsReformatData.push(dataReformat);
      }
      const newTableData = [hostReformatData, ...newGuestsReformatData];
      setShouldUpdate(false);
      setTableData(newTableData);
    }
  }, [shouldUpdate, host, guests, latestData]);

  const handleChange = (value) => {
    setGuests([...value]);
    setShouldUpdate(true);
  };

  const exportAsImage = () => {
    setIsExporting(true);
    setTimeout(() => exportAsPng(), 0);
    setTimeout(() => setIsExporting(false), 0);
  };

  return (
    <Container>
      <FlexSpaceBetween>
        <Text>
          Comparing <Text strong={true}>{host}</Text> with:&nbsp;
        </Text>
        <Button onClick={exportAsImage}>Export as Image</Button>
      </FlexSpaceBetween>
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
        id="compareTable"
        bordered={true}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowClassName={(record) => (record.location === host ? "host-row" : "")}
        rowKey={(record) => record.location}
        className={isExporting ? "ant-table-body" : "export"}
        scroll={isExporting ? null : { y: 500 }}
      />
    </Container>
  );
};

export default Compare;
