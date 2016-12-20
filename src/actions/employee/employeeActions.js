import * as actionTypes from "../../constants/actionTypes";
import EmployeeApi from "../../../mock-api/employee/employeeMockApi";

const requestEmployees = (pageNo, pageSize) => {
  return {
    type   : actionTypes.REQUEST_EMPLOYEES,
    payload: { pageNo, pageSize },
  };
};

const receiveEmployees = (pageNo, pageSize, pageCount, employees) => {
  return {
    type   : actionTypes.RECEIVE_EMPLOYEES,
    payload: { pageNo, pageSize, pageCount, employees }
  };
};

const fetchEmployees = (pageNo, pageSize) => {
  return (dispatch, getState) => {
    dispatch(requestEmployees(pageNo, pageSize));
    if (pageNo && pageSize && getState().pagination.pages[pageNo]) {
      return {
        pageNo,
        pageSize,
        pageCount: getState().pagination.pageCount,
        employees: getState().pagination.pages[pageNo]
      };
    }
    return EmployeeApi.getEmployees(pageNo, pageSize)
                      .then(
                        response => dispatch(
                          receiveEmployees(
                            response.pageNo,
                            response.pageSize,
                            response.pageCount,
                            response.employees
                          )
                        )
                      );
  };
};

export const loadEmployees = (pageNo, pageSize) => {
  return (dispatch, getState) => {
    if (!getState().pagination.fetching) {
      return dispatch(fetchEmployees(pageNo, pageSize));
    }
  };
};
