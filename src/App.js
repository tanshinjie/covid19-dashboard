import React, { useState, useEffect } from "react";
import Navigation from "./Components/Navigation";
import "antd/dist/antd.css";
import "../node_modules/react-vis/dist/style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Compare from "./Pages/Compare";
import _ from "lodash";
import axios from "axios";
import { keysToCamel } from "./Utils";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";

const App = () => {
  const [currentCountry, setCurrentCountry] = useState("Singapore");
  const [countryList, setCountryList] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [pastData, setPastData] = useState(null);

  const changeCountry = (country) => {
    setCurrentCountry(country);
  };

  useEffect(() => {
    if (!latestData && !pastData && countryList.length === 0) {
      async function loadData() {
        let countries = [];
        let newPastData = {};
        let newLatestData = {};
        try {
          const latestDataResponse = await axios.get(
            "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
          );
          Object.values(latestDataResponse.data).map((entry) =>
            countries.push(entry.location)
          );
          Object.values(latestDataResponse.data).forEach((entry) => {
            newLatestData[entry.location] = { ...keysToCamel(entry) };
          });
          console.log("Loaded 1/2", newLatestData);

          const pastDataResponse = await axios.get(
            "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json"
          );

          countries = _.intersection(
            countries,
            Object.values(pastDataResponse.data).map((entry) => entry.location)
          );
          Object.values(pastDataResponse.data).forEach((entry) => {
            newPastData[entry.location] = { ...keysToCamel(entry) };
          });
          console.log("Loaded 2/2", newPastData);

          setCountryList(countries);
          setLatestData(newLatestData);
          setPastData(newPastData);
        } catch (err) {
          console.log(err);
        }
      }
      loadData();
    }
  }, [countryList.length, latestData, pastData]);

  if (countryList.length === 0) {
    return <Loading />;
  }

  return (
    <Router>
      <Navigation
        currentCountry={currentCountry}
        changeCountry={changeCountry}
        countryList={countryList}
      />
      <Switch>
        <Route path="/compare">
          {!!latestData && (
            <Compare
              currentCountry={currentCountry}
              countryList={countryList}
              latestData={latestData}
            />
          )}
        </Route>
        <Route path="/">
          {!!pastData && !!latestData && (
            <Home
              currentCountry={currentCountry}
              pastDataSrc={pastData}
              latestDataSrc={latestData}
            />
          )}
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
