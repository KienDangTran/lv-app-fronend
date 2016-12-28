import { combineReducers } from "redux";
import initialState from "./initialState";
import * as actionTypes from "../constants/actionTypes";

const employees = (
  employees = initialState.entities.employees,
  action = {}
) => {
  if (action.type === actionTypes.RECEIVE_EMPLOYEES) {
    let _employees = {};
    action.payload.employees.forEach(
      employee => {
        _employees = {
          ..._employees,
          [employee.code]: employee
        };
      }
    );
    return {
      ...employees,
      ..._employees
    };
  }

  return employees;
};

const pages = (pages = initialState.pagination.employeePagination.pages, action = {}) => {
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

const currentPage = (
  currentPage = initialState.pagination.employeePagination.currentPage,
  action = {}
) => {
  return action.type === actionTypes.REQUEST_EMPLOYEES && action.payload.pageNo
    ? action.payload.pageNo
    : currentPage;
};

const pageCount = (
  pageCount = initialState.pagination.employeePagination.pageCount,
  action = {}
) => {
  return action.type === actionTypes.RECEIVE_EMPLOYEES && action.payload.pageCount
    ? action.payload.pageCount
    : pageCount;
};

const pageSize = (
  pageSize = initialState.pagination.employeePagination.pageSize,
  action = {}
) => {
  return action.type === actionTypes.RECEIVE_EMPLOYEES && action.payload.pageSize
    ? action.payload.pageSize
    : pageSize;
};

const employeePagination = combineReducers({ pages, currentPage, pageCount, pageSize });

export { employees, employeePagination };
