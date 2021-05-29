import React, { useState, useEffect } from "react";
import Navigation from "./Components/Navigation";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Compare from "./Pages/Compare";

function App() {
  const [currentCountry, setCurrentCountry] = useState("Singapore");
  const changeCountry = (country) => {
    setCurrentCountry(country);
  };
  return (
    <Router>
      <Navigation
        currentCountry={currentCountry}
        changeCountry={changeCountry}
      />
      <Switch>
        <Route path="/compare">
          <Compare />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
