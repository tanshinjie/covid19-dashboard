import React, { useState } from "react";
import LatestData from "../Components/LatestData";
import PastData from "../Components/PastData";
import VaccinationData from "../Components/VaccinationData";
import ViewSettings from "../Components/ViewSettings";
import { Button } from "antd";
import styled from "styled-components";

const Home = ({ currentCountry, pastDataSrc, latestDataSrc, statsDataSrc }) => {
  const pastData = pastDataSrc[currentCountry];
  const latestData = latestDataSrc[currentCountry];
  const statsData = statsDataSrc[currentCountry];

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
    <Container>
      <ButtonContainer>
        <Button onClick={toggleViewSettings}>Customize View</Button>
      </ButtonContainer>
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
    </Container>
  );
};

export default Home;

const Container = styled.div`
  max-width: 1400px;
  margin: auto;
  padding: 2em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
