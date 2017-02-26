import {
  CALL_API
} from "../middleware/api";
import * as endpoint from "../constants/endpoints";
import schemas from "../constants/schemas";

export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';

const shouldFetchEmployees = (state, pageNo, pageSize) => {
  const employeePagination = state.pagination[schemas.EMPLOYEE.key];
  if(employeePagination.fetching) {
    return false;
  } else if(!employeePagination) {
    return true;
  } else if(!employeePagination.pages) {
    return true;
  } else if(!employeePagination.pages[pageNo]) {
    return true;
  } else if(employeePagination.pageSize !== pageSize) {
    return true;
  } else {
    return !employeePagination.pages[pageNo].ids || employeePagination.pages[pageNo].ids.length === 0;
  }
};

export const fetchEmployees = (pageNo, pageSize) => {
  return(dispatch, getState) => {
    if(shouldFetchEmployees(getState(), pageNo, pageSize)) {
      return dispatch({
        pageNo,
        pageSize,
        [CALL_API]: {
          types: [FETCH_EMPLOYEES, FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_FAILURE],
          endpoint: `${endpoint.FETCH_EMPLOYEES}?pageNo=${pageNo}&pageSize=${pageSize}`,
          schema: schemas.EMPLOYEE_ARRAY
        }
      });
    }

    const {
      pagination: {
        [schemas.EMPLOYEE.key]: {
          pages: {
            [pageNo]: {
              ids
            }
          }
        }
      }
    } = getState();

    return dispatch({
      type: FETCH_EMPLOYEES_SUCCESS,
      pageNo,
      pageSize,
      payload: {
        result: ids
      }
    });
  };
};

export const COUNT_EMPLOYEES = 'COUNT_EMPLOYEES';
export const COUNT_EMPLOYEES_SUCCESS = 'COUNT_EMPLOYEES_SUCCESS';
export const COUNT_EMPLOYEE_FAILURE = 'COUNT_EMPLOYEE_FAILURE';

export const countEmployees = () => {
  return(dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [COUNT_EMPLOYEES, COUNT_EMPLOYEES_SUCCESS, COUNT_EMPLOYEE_FAILURE],
        endpoint: endpoint.COUNT_EMPLOYEES
      }
    });
  };
};
