import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import initialState from "./initialState";
import * as actionTypes from "../constants/actionTypes";

const pages = (
  pages = initialState.paginations.pages,
  action = {}
) => {
  switch (action.type) {
    case actionTypes.REQUEST_EMPLOYEES:
      return {
        ...pages,
        [action.payload.page]: { ids: [], fetching: true }
      };
    case actionTypes.RECEIVE_EMPLOYEES:
      return {
        ...pages,
        [action.payload.page]: {
          ids     : action.payload.employees.filter(employee => employee.code),
          fetching: false
        }
      };
    default:
      return pages;
  }
};

const currentPage = (
  currentPage = 1,
  action = {}
) => {
  return action.type === actionTypes.REQUEST_EMPLOYEES ? action.payload.page : currentPage;
};

const paginations = combineReducers({ pages, currentPage });

/**
 * Updates an entity cache in response to any action with response.entities.
 */
const employees = (
  employees = initialState.employees,
  action = {}
) => {
  if (action.type === actionTypes.RECEIVE_EMPLOYEES) {
    let _employees = {};
    for (let employee of action.payload.employees) {
      _employees = {
        ..._employees,
        [employee.code]: employee
      };
    }
    return {
      ...employees,
      ..._employees
    };
  }

  return employees;
};

const rootReducer = combineReducers(
  {
    routing,
    employees,
    paginations
  }
);

export default rootReducer;
