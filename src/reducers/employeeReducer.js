import * as actionTypes from "../actions/actionTypes";

const employeeReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_EMPLOYEES_SUCCESS:
      return action.employees;
    case actionTypes.CREATE_EMPLOYEE:
      return Object.assign({}, state, action.employee);
    default:
      return state;
  }
};

export default employeeReducer;
