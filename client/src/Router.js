import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import PokemonList from "./PokemonList";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/pokemon" component={PokemonList} />
    </Switch>
  </BrowserRouter>
);

export default Router;
