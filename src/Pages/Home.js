import React, { useState, useEffect } from "react";
import LatestData from "../Components/LatestData";
import PastData from "../Components/PastData";
import { getISO, keysToCamel } from "../Utils";
import mockLastestData from "../Data/latest-covid19-tracking.json";
import mockPastData from "../Data/owid-covid-data.json";

const Home = ({ currentCountry }) => {
  const [covidData, setCovidData] = useState(null);
  const [latestCovidData, setLatestCovidData] = useState(null);

  const ISO = getISO(currentCountry);

  useEffect(() => {
    setLatestCovidData(mockLastestData);
    setCovidData(keysToCamel(mockPastData[ISO]));
  }, [ISO]);

  return !latestCovidData ? (
    <div>Loading</div>
  ) : (
    <>
      <LatestData latestCovidData={latestCovidData} />
      <PastData covidData={covidData} />
    </>
  );
};

export default Home;
