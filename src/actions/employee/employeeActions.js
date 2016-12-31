import EmployeeApi from "../../../mock-api/employee/employeeMockApi";

export const types = {
  EMPLOYEES_REQUEST: "EMPLOYEES_REQUEST",
  EMPLOYEES_SUCCESS: "EMPLOYEES_SUCCESS",
  EMPLOYEES_FAILURE: "EMPLOYEES_FAILURE",
};

const requestEmployees = (pageNo, pageSize) => {
  return {
    type   : types.EMPLOYEES_REQUEST,
    payload: {
      pageNo,
      pageSize
    },
  };
};

const employeeSuccess = (pageNo, pageSize, pageCount, employees) => {
  return {
    type   : types.EMPLOYEES_SUCCESS,
    payload: {
      pageNo,
      pageSize,
      pageCount,
      employees
    }
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
      response => dispatch(employeeSuccess(response.pageNo, response.pageSize, response.pageCount, response.employees))
    )
    .catch(
      error => {
        dispatch(employeeFailure(error.pageNo, error.pageSize, error.message, error.status));
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
  if (!employeePagination.pageInfo) {
    return true;
  }
  if (!employeePagination.pageInfo[pageNo]) {
    return true;
  }

  if (employeePagination.pageInfo[pageNo].isFetching) {
    return false;
  }
  if (employeePagination.pageInfo[pageNo].pageSize !== pageSize) {
    return true;
  }

  return !employeePagination.pageInfo[pageNo].ids || employeePagination.pageInfo[pageNo].ids.length === 0;
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
          employeePagination.pageInfo[pageNo].ids.map(id => employees[id])
        )
      );
    }
  };
};
