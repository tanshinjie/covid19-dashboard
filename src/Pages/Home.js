import React, { useState, useEffect } from "react";
import LatestData from "../Components/LatestData";
import { getISO, toCamel } from "../Utils";
import data from "../Data/latest-covid19-tracking.json";

const Home = ({ currentCountry }) => {
  const [covidData, setCovidData] = useState(null);
  const [latestCovidData, setLatestCovidData] = useState(null);

  const ISO = getISO(currentCountry);

  useEffect(() => {
    console.log(data);
    setLatestCovidData(data);

    // fetch(
    //   "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     setLatestCovidData(toCamel(result[ISO]));
    //     console.log("done fetching");
    //   })
    //   .catch((err) => console.log(err));
    // fetch(
    //   "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json"
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     setCovidData(result[ISO].data);
    //     console.log("done fetching");
    //   })
    //   .catch((err) => console.log(err));
  }, [ISO]);

  return !latestCovidData ? (
    <div>Loading</div>
  ) : (
    <LatestData latestCovidData={latestCovidData} />
    // covidData.splice(0, 10).map((d, idx) => <div key={idx}>{d.date}</div>)
  );
};

export default Home;
