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

const App = () => {
  const [currentCountry, setCurrentCountry] = useState("Singapore");
  const [countryList, setCountryList] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [pastData, setPastData] = useState(null);

  const changeCountry = (country) => {
    setCurrentCountry(country);
  };

  useEffect(() => {
    if (!latestData && !statsData && !pastData && countryList.length === 0) {
      let countries = [];
      let newPastData = {};
      let newStatsData = {};
      let newLatestData = {};
      console.log("useEffect");
      axios
        .get(
          "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
        )
        .then((result) => {
          const { data } = result;

          Object.values(data).map((entry) => countries.push(entry.location));
          Object.values(data).forEach((entry) => {
            newLatestData[entry.location] = { ...keysToCamel(entry) };
          });
          console.log("newLatestData", newLatestData);
        })
        .catch((err) => console.log(err));
      axios
        .get(
          "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json" // this is for line chart
        )
        .then((result) => {
          const { data } = result;
          countries = _.intersection(
            countries,
            Object.values(data).map((entry) => entry.location)
          );
          newPastData = {};
          Object.values(data).forEach((entry, i) => {
            newPastData[entry.location] = { ...keysToCamel(entry) };
          });
          console.log("newPastData", newPastData);
        })
        .catch((err) => console.log(err));

      const options = {
        method: "GET",
        url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/", // this is for
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.REACT_APP_X_RAPIDAPI_HOST_VACCOID,
        },
      };

      axios
        .request(options)
        .then((result) => {
          const { data } = result;
          const apiSourceCountryList = data
            .map((entry) => entry.Country)
            .slice(2);
          countries = _.intersection(countries, apiSourceCountryList);
          setCountryList(countries);
          Object.values(data).forEach((entry) => {
            newStatsData[entry.Country] = { ...keysToCamel(entry) };
          });
          console.log("newStatsData", newStatsData);
          setLatestData(newLatestData);
          setPastData(newPastData);
          setStatsData(newStatsData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [countryList.length, latestData, pastData, statsData]);

  return (
    <Router>
      <Navigation
        currentCountry={currentCountry}
        changeCountry={changeCountry}
      />
      <Switch>
        <Route
          path="/compare"
          component={
            countryList.length > 0 && !!statsData
              ? () => (
                  <Compare
                    currentCountry={currentCountry}
                    statsData={statsData}
                    countryList={countryList}
                  />
                )
              : () => <div>Loading</div>
          }
        ></Route>
        <Route
          path="/"
          component={
            countryList.length > 0 && !!pastData && !!latestData && !!statsData
              ? () => (
                  <Home
                    currentCountry={currentCountry}
                    pastDataSrc={pastData}
                    latestDataSrc={latestData}
                    statsDataSrc={statsData}
                  />
                )
              : () => <div>LOADING</div>
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
