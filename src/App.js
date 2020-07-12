import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Details from "./views/Details";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/details/:location" component={Details} />
      </Switch>
    </div>
  );
};

export default App;
