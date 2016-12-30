import { combineReducers } from "redux";
import initialState from "./initialState";
import { types } from "../actions/employee/employeeActions";

const employees = (
  employees = initialState.entities.employees,
  action = {}
) => {
  if (action.type === types.EMPLOYEES_SUCCESS) {
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
    case types.EMPLOYEES_REQUEST:
      return Object.assign({}, pages, { [action.payload.pageNo]: { ids: [], fetching: true } });
    case types.EMPLOYEES_SUCCESS:
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
    case types.EMPLOYEES_FAILURE:
      return Object.assign(
        {},
        pages,
        {
          [action.payload.pageNo]: {
            ids     : [...pages[action.payload.pageNo]],
            fetching: false,
            error   : action.payload.error
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
  return action.type === types.EMPLOYEES_SUCCESS && action.payload.pageNo
    ? action.payload.pageNo
    : currentPage;
};

const pageCount = (
  pageCount = initialState.pagination.employeePagination.pageCount,
  action = {}
) => {
  return action.type === types.EMPLOYEES_SUCCESS && action.payload.pageCount
    ? action.payload.pageCount
    : pageCount;
};

const pageSize = (
  pageSize = initialState.pagination.employeePagination.pageSize,
  action = {}
) => {
  return action.type === types.EMPLOYEES_SUCCESS && action.payload.pageSize
    ? action.payload.pageSize
    : pageSize;
};

const employeePagination = combineReducers({ pages, currentPage, pageCount, pageSize });

export { employees, employeePagination };
