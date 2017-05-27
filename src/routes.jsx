import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as nav from './constants/navPaths';
import * as utils from './utils/utils';
import App from './components/App';
import LoginPage from './components/LoginPage';
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import EmployeeSummaryPage from './components/employee/containers/EmployeeSummaryPage';
import EmployeeDetailsPage from './components/employee/containers/EmployeeDetailsPage';
import UserSummaryPage from './components/user/containers/UserSummaryPage';

export default (
  <Route path={ nav.APP } component={ App }>
    <IndexRoute component={ HomePage } />
    <Route path={ nav.LOGIN } component={ LoginPage } />
    <Route path={ nav.ABOUT } component={ AboutPage } />

    <Route component={ EnsureLoggedInContainer } onEnter={ requireAuth }>
      <Route path={ nav.EMPLOYEE } component={ EmployeeSummaryPage }>
        <Route path={ nav.EMPLOYEE_DETAILS } component={ EmployeeDetailsPage } />
      </Route>
      <Route path={ nav.USER } component={ UserSummaryPage } />
    </Route>

    <Route path="*" component={ NotFoundPage } />
  </Route>
);

function requireAuth(nextState, replace) {
  if (!utils.isLoggedIn()) {
    replace({
      pathname: '/login'
    });
  }
}

