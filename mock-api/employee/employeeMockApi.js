import { DELAY } from "../delay";

const employees = [
  {
    code       : "EMP00001",
    name       : "Employee 1",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e1@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000001"
  },
  {
    code       : "EMP00001",
    name       : "Employee 1",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e1@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000001"
  },
  {
    code       : "EMP00001",
    name       : "Employee 1",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e1@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000001"
  },
  {
    code       : "EMP00001",
    name       : "Employee 1",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e1@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000001"
  },
  {
    code       : "EMP00001",
    name       : "Employee 1",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e1@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000001"
  },
  {
    code       : "EMP00001",
    name       : "Employee 1",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e1@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000001"
  },
  {
    code       : "EMP00001",
    name       : "Employee 1",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e1@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000001"
  },
  {
    code       : "EMP00001",
    name       : "Employee 1",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e1@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000001"
  },
  {
    code       : "EMP00001",
    name       : "Employee 1",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e1@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000001"
  },
  {
    code       : "EMP0000002",
    name       : "Employee 2",
    dateOfBirth: "",
    sex        : "0",
    email      : "e2@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000001"
  }
];

class EmployeeApi {
  static getEmployees() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], employees));
      }, DELAY);
    });
  }

  static saveEmployee(employee) {
    employee = Object.assign({}, employee);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (employee.name.length < 3) {
          reject("Employee Name must be at least than 3 characters");
        }

        if (employee.code) {
          const existingEmployeeIndex = employees.findIndex(e => e.code === employee.code);
          employees.splice(existingEmployeeIndex, 1,  employee);
        }

        resolve(employee);
      }, DELAY);
    });
  }
}

export default EmployeeApi;
