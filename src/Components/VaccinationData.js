import React from "react";
import { Progress, Tooltip, Typography } from "antd";
import { numberWithCommas } from "../Utils";

const VaccinationData = ({ vaccinationData }) => {
  const vaccinatedOverPopulation = Math.floor(
    (vaccinationData.peopleVaccinated / vaccinationData.population) * 100
  );
  const fullyVaccinatedOverPopulation = Math.floor(
    (vaccinationData.peopleFullyVaccinated / vaccinationData.population) * 100
  );

  return (
    <>
      <Typography.Title level={3}>Vaccination Progress</Typography.Title>
      <div style={{ padding: "100px" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Typography.Paragraph>{`People fully vaccinated: ${numberWithCommas(
            vaccinationData.peopleFullyVaccinated
          )} (${fullyVaccinatedOverPopulation}%)`}</Typography.Paragraph>
          <Typography.Paragraph>{`People vaccinated: ${numberWithCommas(
            vaccinationData.peopleVaccinated
          )} (${vaccinatedOverPopulation}%)`}</Typography.Paragraph>
          <Typography.Paragraph>{`Population: ${numberWithCommas(
            vaccinationData.population
          )}`}</Typography.Paragraph>
        </div>
        <Tooltip
          title={`People fully vaccinated: ${numberWithCommas(
            vaccinationData.peopleFullyVaccinated
          )} People vaccinated: ${numberWithCommas(
            vaccinationData.peopleVaccinated
          )} Population: ${numberWithCommas(vaccinationData.population)}`}
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
