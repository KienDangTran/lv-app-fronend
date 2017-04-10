import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as nav from './constants/navPaths';
import App from './components/App';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import EmployeeSummaryPage from './components/employee/containers/EmployeeSummaryPage';
import EmployeeDetailsPage from './components/employee/containers/EmployeeDetailsPage';
import UserSummaryPage from './components/user/containers/UserSummaryPage';

export default (
  <Route path={ nav.APP } component={ App }>
    <IndexRoute component={ HomePage } />

    <Route onEnter={ requireAuthentication }>
      <Route path={ nav.ABOUT } component={ AboutPage } />
      <Route path={ nav.EMPLOYEE } component={ EmployeeSummaryPage }>
        <Route path={ nav.EMPLOYEE_DETAILS } component={ EmployeeDetailsPage } />
      </Route>
      <Route path={ nav.USER } component={ UserSummaryPage } />
    </Route>

    <Route path="*" component={ NotFoundPage } />
  </Route>
);

function requireAuthentication(nextState, replace) {
  if (!localStorage.getItem('token')) {
    replace(
      {
        pathname: nav.LOGIN,
        state: { nextPathname: nextState.location.pathname }
      }
    );
  } else {
    replace(null, nav.APP);
  }
}
