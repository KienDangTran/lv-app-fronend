import React from "react";
import { Route, IndexRoute } from "react-router";
import * as navPaths from "./constants/navPaths";
import App from "./components/App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./components/LoginPage";
import EmployeeSummaryPage from "./containers/employee/EmployeeSummaryPage";
import EmployeeDetailsPage from "./containers/employee/EmployeeDetailsPage";
import UserSummaryPage from "./containers/user/UserSummaryPage";

export default (
  <Route path={ navPaths.APP } component={ App }>
    <IndexRoute component={ HomePage }/>

    <Route
      path="/login"
      component={ LoginPage }
    />

    <Route
      path="*"
      component={ NotFoundPage }
    />

    <Route
      path={ navPaths.ABOUT}
      component={ AboutPage }
    />

    <Route
      path={ navPaths.EMPLOYEE }
      component={ EmployeeSummaryPage }
      onEnter={ requireAuthentication }
    >
      <Route
        path={ navPaths.EMPLOYEE_DETAILS }
        component={ EmployeeDetailsPage }
      />
    </Route>

    <Route
      path={ navPaths.USER }
      component={ UserSummaryPage }
      onEnter={ requireAuthentication }
    />
  </Route>
);

function requireAuthentication(nextState, replace) {
  if (!sessionStorage.getItem("jwt")) {
    replace(
      {
        pathname: navPaths.APP,
        state   : { nextPathname: nextState.location.pathname }
      }
    );
  }
}
