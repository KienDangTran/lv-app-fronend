import { combineReducers } from "redux";
import initialState from "./initialState";
import { EMPLOYEES_REQUEST, EMPLOYEES_SUCCESS, EMPLOYEES_FAILURE } from "../actions/employee/employeeActions";

const employees = (
  employees = initialState.entities.employees,
  action = {}
) => {
  if (action.type === EMPLOYEES_SUCCESS) {
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

const pageInfo = (pageInfo = initialState.pagination.employeePagination.pageInfo, action = {}) => {
  switch (action.type) {
    case EMPLOYEES_REQUEST:
      return Object.assign(
        {},
        pageInfo,
        {
          [action.payload.pageNo]: {
            ids     : [],
            pageSize: action.payload.pageSize,
            fetching: true
          }
        }
      );
    case EMPLOYEES_SUCCESS:
      return Object.assign(
        {},
        pageInfo,
        {
          [action.payload.pageNo]: {
            ids     : action.payload.employees.map(employee => employee.code),
            pageSize: action.payload.pageSize,
            fetching: false
          }
        }
      );
    case EMPLOYEES_FAILURE:
      return Object.assign(
        {},
        pageInfo,
        {
          [action.payload.pageNo]: {
            ids     : [...pageInfo[action.payload.pageNo]],
            pageSize: action.payload.pageSize,
            fetching: false,
            error   : action.payload.error
          }
        }
      );
    default:
      return pageInfo;
  }
};

const activePage = (
  activePage = initialState.pagination.employeePagination.activePage,
  action = {}
) => {
  return action.type === EMPLOYEES_SUCCESS && action.payload.pageNo
    ? action.payload.pageNo
    : activePage;
};

const pageCount = (
  pageCount = initialState.pagination.employeePagination.pageCount,
  action = {}
) => {
  return action.type === EMPLOYEES_SUCCESS && action.payload.pageCount
    ? action.payload.pageCount
    : pageCount;
};

const employeePagination = combineReducers({ pageInfo, activePage, pageCount });

export { employees, employeePagination };
