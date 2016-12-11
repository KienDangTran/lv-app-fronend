import * as actionTypes from "../../constants/actionTypes";
import * as schemas from "../../constants/schemes";
import * as api from "../../constants/api";

/**
 * Fetches a page of employee. Relies on the custom API middleware defined in ../middleware/api.js.
 * @returns {{}}
 */
const fetchEmployees = (nextPageUrl) => {
  return {
    [actionTypes.CALL_API]: {
      types   : [
        actionTypes.FETCH_EMPLOYEES_REQUEST,
        actionTypes.FETCH_EMPLOYEES_SUCCESS,
        actionTypes.FETCH_EMPLOYEES_FAILURE
      ],
      endpoint: nextPageUrl,
      schema  : schemas.EMPLOYEE
    }
  };
};

export function loadEmployees(nextPage) {
  return (dispatch, getState) => {
    const { nextPageUrl = api.EMPLOYEE, pageCount = 0 } = getState().pagination.employeePage || {};

    if (pageCount > 0 && !nextPage) {
      return null;
    }
    return () => {
      dispatch(fetchEmployees(nextPageUrl));
    };
  };
}
