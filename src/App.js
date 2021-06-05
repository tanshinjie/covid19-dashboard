import React, { useState } from "react";
import Navigation from "./Components/Navigation";
import "antd/dist/antd.css";
import "../node_modules/react-vis/dist/style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Compare from "./Pages/Compare";

function App() {
  const [currentCountry, setCurrentCountry] = useState("Singapore");

  console.log(currentCountry);

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
          <Home currentCountry={currentCountry} />
        </Route>
        <Route path="/">
          <Compare currentCountry={currentCountry} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
