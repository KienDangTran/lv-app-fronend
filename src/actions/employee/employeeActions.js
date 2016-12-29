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

const shouldFetchEmployees = (state, pageNo, pageSize) => {
  const employeePagination = state.pagination.employeePagination;
  if (!employeePagination) {
    return true;
  }
  if (employeePagination.pageSize !== pageSize) {
    return true;
  }
  if (!employeePagination.pages) {
    return true;
  }
  if (!employeePagination.pages[pageNo]) {
    return true;
  }

  if (employeePagination.pages[pageNo].isFetching) {
    return false;
  }

  if (employeePagination.pages[pageNo].isFetching
    || !employeePagination.pages[pageNo].ids
    || employeePagination.pages[pageNo].ids.length === 0) {
    return true;
  }

  return false;
};

export const loadEmployees = (pageNo, pageSize) => {
  return (dispatch, getState) => {
    if (shouldFetchEmployees(getState(), pageNo, pageSize)) {
      console.log(`fetching ${pageSize} items of page ${pageNo}`);
      return dispatch(fetchEmployees(pageNo, pageSize));
    }
    else {
      const {
              entities: { employees },
              pagination: { employeePagination }
            } = getState();
      return dispatch(
        receiveEmployees(
          pageNo,
          pageSize,
          getState().pagination.employeePagination.pageCount,
          employeePagination.pages[pageNo].ids.map(id => employees[id])
        )
      );
    }
  };
};
