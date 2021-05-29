import React from "react";
import { Select, Typography } from "antd";
import { getAllCountryName } from "../Utils";
import data from "../Data/countries.json";
import styled from "styled-components";
import { Link } from "react-router-dom";
const { Option } = Select;

const countries = getAllCountryName(data);

const Navigation = ({ currentCountry, changeCountry }) => {
  const onChangeCountry = (value) => {
    console.log(value);
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
          <TextButton>
            <i>yet another</i>&nbsp;COVID-19 Dashboard for
          </TextButton>
        </Link>
        <Select defaultValue={currentCountry} onChange={onChangeCountry}>
          {options}
        </Select>
      </div>
      <div>
        <Link to="/compare">
          <TextButton>Compare</TextButton>
        </Link>
        <TextButton>Customize Data</TextButton>
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
`;
