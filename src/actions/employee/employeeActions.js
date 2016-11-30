import * as actionTypes from "../actionTypes";
import EmployeeApi from "../../../mock-api/employee/employeeMockApi";

export function loadEmployeesSuccess(employees) {
  return { type: actionTypes.LOAD_EMPLOYEES_SUCCESS, employees };
}

export function loadEmployees() {
  return (dispatch) => {
    return EmployeeApi.getEmployees().then(employees => {
      dispatch(loadEmployeesSuccess(employees));
    });
  };
}

export function createEmployee(employee) {
  return { type: actionTypes.CREATE_EMPLOYEE, employee };
}
