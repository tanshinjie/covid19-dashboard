import React from "react";
import { Progress, Tooltip, Typography } from "antd";
import { numberWithCommas } from "../Utils";
import styled from "styled-components";
import { ContentContainer } from "../Styles";
const { Title, Paragraph } = Typography;

const VaccinationData = ({ vaccinationData }) => {
  const peopleVaccinated = vaccinationData.peopleVaccinated
    ? vaccinationData.peopleVaccinated
    : 0;
  const peopleFullyVaccinated = vaccinationData.peopleFullyVaccinated
    ? vaccinationData.peopleFullyVaccinated
    : 0;
  const population = vaccinationData.population
    ? vaccinationData.population
    : 0;
  const vaccinatedOverPopulation = Math.floor(
    (peopleVaccinated / population) * 100
  );
  const fullyVaccinatedOverPopulation = Math.floor(
    (peopleFullyVaccinated / population) * 100
  );

  return (
    <ContentContainer marginTop={"5rem"}>
      <Title level={4}>Vaccination Progress</Title>
      <FlexSpaceAround>
        <Paragraph strong>{`People fully vaccinated: ${numberWithCommas(
          peopleFullyVaccinated
        )} (${fullyVaccinatedOverPopulation}%)`}</Paragraph>
        <Paragraph strong>{`People vaccinated: ${numberWithCommas(
          peopleVaccinated
        )} (${vaccinatedOverPopulation}%)`}</Paragraph>
        <Paragraph strong>{`Population: ${numberWithCommas(
          population
        )}`}</Paragraph>
      </FlexSpaceAround>
      <Tooltip
        title={`People fully vaccinated: ${numberWithCommas(
          peopleFullyVaccinated
        )} People vaccinated: ${numberWithCommas(
          peopleVaccinated
        )} Population: ${numberWithCommas(population)}`}
      >
        <Progress
          percent={vaccinatedOverPopulation}
          success={{
            percent: fullyVaccinatedOverPopulation,
          }}
        />
      </Tooltip>
    </ContentContainer>
  );
};

export default VaccinationData;

const FlexSpaceAround = styled.div`
  display: flex;
  justify-content: space-around;
`;
