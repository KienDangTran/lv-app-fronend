import * as actionTypes from "../../constants/actionTypes";
import EmployeeApi from "../../../mock-api/employee/employeeMockApi";

const requestEmployees = (page) => {
  return {
    type   : actionTypes.REQUEST_EMPLOYEES,
    payload: { page },
  };
};

const receiveEmployees = (page, employees) => {
  return {
    type   : actionTypes.RECEIVE_EMPLOYEES,
    payload: { page, employees }
  };
};

const fetchEmployees = (page) => {
  return (dispatch) => {
    dispatch(requestEmployees(page));
    return EmployeeApi.getEmployees(page)
                      .then(response => dispatch(receiveEmployees(page, response)));
  };
};

export const loadEmployees = (page = 1) => {
  return (dispatch, getState) => {
    if (!getState().paginations.fetching) {
      return dispatch(fetchEmployees(page));
    }
  };
};
