import EmployeeApi from "./employee/employeeMockApi";

const EMPLOYEE_API_URL = "localhost:8080/api/employees";

export const fetch = (url) => {
  switch (url) {
    case EMPLOYEE_API_URL:
      return EmployeeApi.getEmployees();
      break;
  }
};
