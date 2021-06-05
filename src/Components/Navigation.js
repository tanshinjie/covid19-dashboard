import React from "react";
import { Select, Typography } from "antd";
import { getAllCountryNameByKey } from "../Utils";
import data from "../Data/countries.json";
import styled from "styled-components";
import { Link } from "react-router-dom";
const { Option } = Select;

const countries = getAllCountryNameByKey(data, "name");

const Navigation = ({ currentCountry, changeCountry }) => {
  const onChangeCountry = (value) => {
    changeCountry(value);
  };
  const options = countries.map((c) => (
    <Option key={c} value={c}>
      {c}
    </Option>
  ));

  return (
    <NavigationContainer>
      <div>
        <Link to="/">
          <TextButton>COVID-19 Dashboard for</TextButton>
        </Link>
        <Select
          showSearch
          style={{ width: 150 }}
          optionFilterProp="children"
          defaultValue={currentCountry}
          onChange={onChangeCountry}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options}
        </Select>
      </div>
      <div>
        <Link to="/compare">
          <TextButton>Compare</TextButton>
        </Link>
      </div>
    </NavigationContainer>
  );
};

export default Navigation;

const NavigationContainer = styled.nav`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const TextButton = styled(Typography.Text)`
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
