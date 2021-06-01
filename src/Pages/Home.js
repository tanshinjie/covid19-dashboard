import React, { useState, useEffect } from "react";
import LatestData from "../Components/LatestData";
import PastData from "../Components/PastData";
import { getISO, keysToCamel } from "../Utils";
import mockLastestData from "../Data/latest-covid19-tracking.json";
import mockPastData from "../Data/owid-covid-data.json";
import mockVaccinationData from "../Data/latest.json";
import VaccinationData from "../Components/VaccinationData";

const Home = ({ currentCountry }) => {
  const [covidData, setCovidData] = useState(null);
  const [vaccinationData, setVaccinationData] = useState(null);
  const [latestCovidData, setLatestCovidData] = useState(null);

  const ISO = getISO(currentCountry);

  useEffect(() => {
    setLatestCovidData(mockLastestData);
    setVaccinationData(keysToCamel(mockVaccinationData[ISO]));
    setCovidData(keysToCamel(mockPastData[ISO]));
  }, [ISO]);

  return !latestCovidData && !covidData && !vaccinationData ? (
    <div>Loading</div>
  ) : (
    <>
      <LatestData latestCovidData={latestCovidData} />
      <PastData covidData={covidData} />
      <VaccinationData vaccinationData={vaccinationData} />
    </>
  );
};

export default Home;
