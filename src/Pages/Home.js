import React, { useState, useEffect } from "react";
import LatestData from "../Components/LatestData";
import PastData from "../Components/PastData";
import VaccinationData from "../Components/VaccinationData";
import ViewSettings from "../Components/ViewSettings";
import { Button } from "antd";
import styled from "styled-components";
import { Container } from "../Components/Styles";

const LOCAL_STORAGE_KEY = "viewSettings";

const Home = ({ currentCountry, pastDataSrc, latestDataSrc, statsDataSrc }) => {
  const pastData = pastDataSrc[currentCountry];
  const latestData = latestDataSrc[currentCountry];
  const statsData = statsDataSrc[currentCountry];

  const [viewConfig, setViewConfig] = useState(null);

  useEffect(() => {
    if (viewConfig === null) {
      if (localStorage.getItem(LOCAL_STORAGE_KEY) !== null) {
        setViewConfig(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
      } else {
        const viewConfigInitialValues = {
          showLatestData: true,
          showTotalCases: true,
          showTotalDeaths: true,
          showVaccinationProgress: true,
        };
        setViewConfig(viewConfigInitialValues);
      }
    }
  }, [viewConfig]);

  const [shouldOpenViewSettings, setShouldOpenViewSettings] = useState(false);

  const toggleViewSettings = () => {
    setShouldOpenViewSettings(!shouldOpenViewSettings);
  };
  const closeViewSettings = () => {
    setShouldOpenViewSettings(false);
  };

  const updateViewConfig = (value) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    setViewConfig(value);
  };

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={toggleViewSettings}>Customize View</Button>
      </ButtonContainer>
      {shouldOpenViewSettings && viewConfig && (
        <ViewSettings
          closeViewSettings={closeViewSettings}
          updateViewConfig={updateViewConfig}
          viewConfig={viewConfig}
        />
      )}
      {viewConfig && viewConfig.showLatestData && (
        <LatestData latestCovidData={latestData} statsDataSrc={statsData} />
      )}
      {viewConfig && (
        <PastData
          covidData={pastData}
          showTotalCases={viewConfig.showTotalCases}
          showTotalDeaths={viewConfig.showTotalDeaths}
        />
      )}
      {viewConfig && viewConfig.showVaccinationProgress && (
        <VaccinationData vaccinationData={latestData} />
      )}
    </Container>
  );
};

export default Home;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
