import React from "react";
import { Select, Typography } from "antd";
import { getAllCountryNameByKey } from "../Utils";
import styled from "styled-components";
import { Link } from "react-router-dom";
import countriesData from "../Data/countries.json";
import countriesWorldState from "../Data/world-stats.json";
const { Option } = Select;

const countries = getAllCountryNameByKey(countriesData, "name");
const countriesWorldStateList = [
  ...getAllCountryNameByKey(countriesWorldState, "Country").slice(
    2,
    countriesWorldState.length - 1
  ),
].sort();

console.log(countries);
console.log(countriesWorldStateList);

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
