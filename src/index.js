import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import routes from "./routes";
import configureStore from "./store/configureStore";
import { syncHistoryWithStore } from "react-router-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
import "./styles/styles.scss";
require("./favicon.ico"); // Tell webpack to load favicon.ico

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={ store }>
    <Router history={ history } routes={ routes }/>
  </Provider>,
  document.getElementById('app')
);
