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
  return (dispatch) => {
    dispatch(requestEmployees(pageNo, pageSize));
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
    if (
      pageNo
      && pageSize
      && getState().pagination.pages[pageNo]
      && getState().pagination.pages[pageNo].ids.length > 0
      && pageSize === getState().pagination.pageSize
    ) {
      dispatch(receiveEmployees(pageNo, pageSize));
      return null;
    }

    if (!getState().pagination.fetching) {
      return dispatch(fetchEmployees(pageNo, pageSize));
    }
  };
};
