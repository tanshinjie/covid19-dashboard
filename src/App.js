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
import mockLatestData from "./Data/latest.json";
import mockPastData from "./Data/past.json";
import mockWorldStats from "./Data/world-stats.json";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";

const COUNTRY_RENAME = {
  "Cape Verde": "Cabo Verde",
  CAR: "Central African Republic",
  USA: "United States",
  UK: "United Kingdom",
  UAE: "United Arab Emirates",
  "S. Korea": "South Korea",
  DRC: "Democratic Republic of Congo",
  "Sint Maarten": "Sint Maarten (Dutch part)",
  "Vatican City": "Vatican",
  "Turks and Caicos": "Turks and Caicos Islands",
  "Timor-Leste": "Timor",
};

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

      // Object.values(mockLatestData).map((entry) =>
      //   countries.push(entry.location)
      // );

      // Object.values(mockLatestData).forEach((entry) => {
      //   newLatestData[entry.location] = { ...keysToCamel(entry) };
      // });
      // console.log("newLatestData", newLatestData);

      // countries = _.intersection(
      //   countries,
      //   Object.values(mockLatestData).map((entry) => entry.location)
      // );

      // newPastData = {};
      // Object.values(mockPastData).forEach((entry) => {
      //   newPastData[entry.location] = { ...keysToCamel(entry) };
      // });
      // console.log("newPastData", newPastData);

      // const apiSourceCountryList = Object.values(mockWorldStats)
      //   .map((entry) => entry.country)
      //   .slice(2);
      // countries = _.intersection(countries, apiSourceCountryList);

      // Object.values(mockWorldStats).forEach((entry) => {
      //   if (Object.keys(COUNTRY_RENAME).includes(entry.country)) {
      //     newStatsData[COUNTRY_RENAME[entry.country]] = {
      //       ...keysToCamel(entry),
      //       country: COUNTRY_RENAME[entry.country],
      //     };
      //   } else {
      //     newStatsData[entry.country] = { ...keysToCamel(entry) };
      //   }
      // });
      // console.log("newStatsData", newStatsData);
      // countries = countries.concat([...Object.values(COUNTRY_RENAME)]);
      // countries.sort();
      // setCountryList(countries);
      // setLatestData(newLatestData);
      // setPastData(newPastData);
      // setStatsData(newStatsData);

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
          Object.values(data).forEach((entry) => {
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

          Object.values(data).forEach((entry) => {
            if (Object.keys(COUNTRY_RENAME).includes(entry.Country)) {
              newStatsData[COUNTRY_RENAME[entry.Country]] = {
                ...keysToCamel(entry),
                country: COUNTRY_RENAME[entry.Country],
              };
            } else {
              newStatsData[entry.Country] = { ...keysToCamel(entry) };
            }
          });
          countries = countries.concat([...Object.values(COUNTRY_RENAME)]);
          countries.sort();
          console.log("newStatsData", newStatsData);
          setLatestData(newLatestData);
          setPastData(newPastData);
          setStatsData(newStatsData);
          setCountryList(countries);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [countryList.length, latestData, pastData, statsData]);

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
        <Route
          path="/compare"
          component={
            !!statsData
              ? () => (
                  <Compare
                    currentCountry={currentCountry}
                    statsData={statsData}
                    countryList={countryList}
                  />
                )
              : () => <Loading />
          }
        ></Route>
        <Route
          path="/"
          component={
            !!pastData && !!latestData && !!statsData
              ? () => (
                  <Home
                    currentCountry={currentCountry}
                    pastDataSrc={pastData}
                    latestDataSrc={latestData}
                    statsDataSrc={statsData}
                  />
                )
              : () => <Loading />
          }
        />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
