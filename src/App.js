import React, { useState } from "react";
import Navigation from "./Components/Navigation";
import "antd/dist/antd.css";
import "../node_modules/react-vis/dist/style.css";
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
          <Compare currentCountry={currentCountry} />
        </Route>
        <Route path="/">
          <Home currentCountry={currentCountry} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
