import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import initialState from "./initialState";
import * as actionTypes from "../constants/actionTypes";

const pages = (pages = initialState.pagination.pages, action = {}) => {
  switch (action.type) {
    case actionTypes.REQUEST_EMPLOYEES:
      return Object.assign({}, pages, { [action.payload.pageNo]: { ids: [], fetching: true } });
    case actionTypes.RECEIVE_EMPLOYEES:
      return Object.assign(
        {},
        pages,
        {
          [action.payload.pageNo]: {
            ids     : action.payload.employees.map(employee => employee.code),
            fetching: false
          }
        }
      );
    default:
      return pages;
  }
};

const currentPage = (currentPage = 1, action = {}) => {
  return action.type === actionTypes.REQUEST_EMPLOYEES && action.payload.pageNo
    ? action.payload.pageNo
    : currentPage;
};

const pageCount = (pageCount = 1, action = {}) => {
  return action.type === actionTypes.RECEIVE_EMPLOYEES && action.payload.pageCount
    ? action.payload.pageCount
    : pageCount;
};

const pageSize = (pageSize = 5, action = {}) => {
  return action.type === actionTypes.RECEIVE_EMPLOYEES && action.payload.pageSize
    ? action.payload.pageSize
    : pageSize;
};

const pagination = combineReducers({ pages, currentPage, pageCount, pageSize });

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
    pagination
  }
);

export default rootReducer;
