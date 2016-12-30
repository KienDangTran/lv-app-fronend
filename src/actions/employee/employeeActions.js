import EmployeeApi from "../../../mock-api/employee/employeeMockApi";

export const types = {
  EMPLOYEES_REQUEST: "EMPLOYEES_REQUEST",
  EMPLOYEES_SUCCESS: "EMPLOYEES_SUCCESS",
  EMPLOYEES_FAILURE: "EMPLOYEES_FAILURE",
};

const requestEmployees = (pageNo, pageSize) => {
  return {
    type   : types.EMPLOYEES_REQUEST,
    payload: { pageNo, pageSize },
  };
};

const employeeSuccess = (pageNo, pageSize, pageCount, employees) => {
  return {
    type   : types.EMPLOYEES_SUCCESS,
    payload: { pageNo, pageSize, pageCount, employees }
  };
};

const employeeFailure = (pageNo, pageSize, message, status) => {
  return {
    type   : types.EMPLOYEES_FAILURE,
    payload: {
      pageNo,
      pageSize,
      error: { message, status }
    }
  };
};

const fetchEmployees = (pageNo, pageSize) => {
  return (dispatch) => {
    dispatch(requestEmployees(pageNo, pageSize));
    return EmployeeApi
      .getEmployees(pageNo, pageSize)
      .then(
        response => dispatch(
          employeeSuccess(
            response.pageNo,
            response.pageSize,
            response.pageCount,
            response.employees
          )
        )
      )
      .catch(
        error => {
          dispatch(employeeFailure(error.message, error.status));
          throw error;
        }
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

  if (employeePagination.pages[pageNo].error) {
    return true;
  }

  return !employeePagination.pages[pageNo].ids || employeePagination.pages[pageNo].ids.length === 0;
};

export const loadEmployees = (pageNo, pageSize) => {
  return (dispatch, getState) => {
    if (shouldFetchEmployees(getState(), pageNo, pageSize)) {
      return dispatch(fetchEmployees(pageNo, pageSize));
    }
    else {
      const {
              entities: { employees },
              pagination: { employeePagination }
            } = getState();
      return dispatch(
        employeeSuccess(
          pageNo,
          pageSize,
          getState().pagination.employeePagination.pageCount,
          employeePagination.pages[pageNo].ids.map(id => employees[id])
        )
      );
    }
  };
};
