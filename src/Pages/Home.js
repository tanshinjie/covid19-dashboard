import React, { useState } from "react";
import LatestData from "../Components/LatestData";
import PastData from "../Components/PastData";
import VaccinationData from "../Components/VaccinationData";
import ViewSettings from "../Components/ViewSettings";
import { Button } from "antd";

const Home = ({ currentCountry, pastDataSrc, latestDataSrc, statsDataSrc }) => {
  const [pastData] = useState(pastDataSrc[currentCountry]);
  const [latestData] = useState(latestDataSrc[currentCountry]);
  const [statsData] = useState(statsDataSrc[currentCountry]);

  console.log("Home statsDataSrc", statsDataSrc);
  console.log("Home statsData", statsData);

  const [viewConfig, setViewConfig] = useState({
    showLatestData: true,
    showTotalCases: true,
    showTotalDeath: true,
    showVaccinationProgress: true,
  });
  const [shouldOpenViewSettings, setShouldOpenViewSettings] = useState(false);

  const toggleViewSettings = () => {
    setShouldOpenViewSettings(!shouldOpenViewSettings);
  };
  const closeViewSettings = () => {
    setShouldOpenViewSettings(false);
  };

  const updateViewConfig = (value) => {
    setViewConfig(value);
  };

  return (
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
        <LatestData latestCovidData={latestData} statsDataSrc={statsData} />
      )}
      <PastData
        covidData={pastData}
        showTotalCases={viewConfig.showTotalCases}
        showTotalDeath={viewConfig.showTotalDeath}
      />
      {viewConfig.showVaccinationProgress && (
        <VaccinationData vaccinationData={latestData} />
      )}
    </>
  );
};

export default Home;
