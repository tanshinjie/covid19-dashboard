import React from "react";
import { Progress, Tooltip, Typography } from "antd";
import { numberWithCommas } from "../Utils";

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
    <>
      <Typography.Title level={3}>Vaccination Progress</Typography.Title>
      <div style={{ padding: "100px" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Typography.Paragraph>{`People fully vaccinated: ${numberWithCommas(
            peopleFullyVaccinated
          )} (${fullyVaccinatedOverPopulation}%)`}</Typography.Paragraph>
          <Typography.Paragraph>{`People vaccinated: ${numberWithCommas(
            peopleVaccinated
          )} (${vaccinatedOverPopulation}%)`}</Typography.Paragraph>
          <Typography.Paragraph>{`Population: ${numberWithCommas(
            population
          )}`}</Typography.Paragraph>
        </div>
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
      </div>
    </>
  );
};

export default VaccinationData;
