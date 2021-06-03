import React, { useState, useEffect } from "react";
import LatestData from "../Components/LatestData";
import PastData from "../Components/PastData";
import { getISO, keysToCamel } from "../Utils";
import mockLastestData from "../Data/latest-covid19-tracking.json";
import mockPastData from "../Data/owid-covid-data.json";
import mockVaccinationData from "../Data/latest.json";
import VaccinationData from "../Components/VaccinationData";
import { Button } from "antd";
import ViewSettings from "../Components/ViewSettings";

const Home = ({ currentCountry }) => {
  const [covidData, setCovidData] = useState(null);
  const [vaccinationData, setVaccinationData] = useState(null);
  const [latestCovidData, setLatestCovidData] = useState(null);
  const [viewConfig, setViewConfig] = useState({
    showLatestData: true,
    showTotalCases: true,
    showTotalDeath: true,
    showVaccinationProgress: true,
  });
  const [shouldOpenViewSettings, setShouldOpenViewSettings] = useState(false);

  const ISO = getISO(currentCountry);

  const toggleViewSettings = () => {
    setShouldOpenViewSettings(!shouldOpenViewSettings);
  };
  const closeViewSettings = () => {
    setShouldOpenViewSettings(false);
  };

  const updateViewConfig = (value) => {
    setViewConfig(value);
  };

  useEffect(() => {
    // fetch(
    //   "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("covidData", keysToCamel(result[ISO]));
    //     setVaccinationData(keysToCamel(result[ISO]));
    //   })
    //   .catch((err) => console.log(err));
    // fetch(
    //   "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json"
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     setCovidData(keysToCamel(result[ISO]));
    //   })
    //   .catch((err) => console.log(err));

    // fetch(`https://covid-19-tracking.p.rapidapi.com/v1/${currentCountry}`, {
    //   method: "GET",
    //   headers: {
    //     useQueryString: true,
    //     "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY,
    //     "x-rapidapi-host":
    //       process.env.REACT_APP_X_RAPIDAPI_HOST_COVID19_TRACKING,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     setLatestCovidData(keysToCamel(result));
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    setLatestCovidData(keysToCamel(mockLastestData));
    setVaccinationData(keysToCamel(mockVaccinationData[ISO]));
    setCovidData(keysToCamel(mockPastData[ISO]));
  }, [ISO, viewConfig]);

  return latestCovidData && covidData && vaccinationData ? (
    <>
      <Button onClick={toggleViewSettings}>Customize View</Button>
      {shouldOpenViewSettings && (
        <ViewSettings
          closeViewSettings={closeViewSettings}
          updateViewConfig={updateViewConfig}
          viewConfig={viewConfig}
        />
      )}
      {viewConfig.showLatestData && (
        <LatestData latestCovidData={latestCovidData} />
      )}
      <PastData
        covidData={covidData}
        showTotalCases={viewConfig.showTotalCases}
        showTotalDeath={viewConfig.showTotalDeath}
      />
      {viewConfig.showVaccinationProgress && (
        <VaccinationData vaccinationData={vaccinationData} />
      )}
    </>
  ) : (
    <>
      <div>Loading</div>
    </>
  );
};

export default Home;
