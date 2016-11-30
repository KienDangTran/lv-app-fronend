import React from "react";
import { Route, IndexRoute } from "react-router";
import * as path from "./constants/paths";
import App from "./components/App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage.js";
import NotFoundPage from "./components/NotFoundPage.js";
import EmployeesPage from "./containers/employee/main/EmployeesPage";
import EmployeeDetailsPage from "./containers/employee/main/EmployeeDetailsPage";

export default (
  <Route path={ path.APP } component={ App }>
    <IndexRoute component={ HomePage }/>
    <Route path={ path.ABOUT} component={ AboutPage }/>
    <Route path={ path.EMPLOYEES } component={ EmployeesPage }/>
    <Route path={ path.EMPLOYEE_DETAILS } component={ EmployeeDetailsPage }/>
    <Route path="*" component={ NotFoundPage }/>
  </Route>
);
