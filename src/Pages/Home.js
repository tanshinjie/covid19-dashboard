import React, { useState } from "react";

const Home = () => {
  const [covidData, setcovidData] = useState(null);
  const [vacData, setVacData] = useState(null);

  return !covidData ? (
    <div>Loading</div>
  ) : (
    covidData.splice(0, 10).map((d, idx) => <div key={idx}>{d.date}</div>)
  );
};

export default Home;
