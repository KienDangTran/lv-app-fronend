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
    code       : "EMP00002",
    name       : "Employee 2",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e2@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000002"
  },
  {
    code       : "EMP00003",
    name       : "Employee 3",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e3@example.com",
    phone      : "01648172820",
    status     : "0",
    userId     : "U0000003"
  },
  {
    code       : "EMP00004",
    name       : "Employee 4",
    dateOfBirth: "1991-09-12",
    sex        : "0",
    email      : "e4@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000004"
  },
  {
    code       : "EMP00005",
    name       : "Employee 5",
    dateOfBirth: "1991-09-12",
    sex        : "2",
    email      : "e5@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000005"
  },
  {
    code       : "EMP00006",
    name       : "Employee 6",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e6@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000006"
  },
  {
    code       : "EMP00007",
    name       : "Employee 7",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e7@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000007"
  },
  {
    code       : "EMP00008",
    name       : "Employee 8",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e9@example.com",
    phone      : "01648172820",
    status     : "0",
    userId     : "U0000009"
  },
  {
    code       : "EMP00010",
    name       : "Employee 10",
    dateOfBirth: "1991-09-12",
    sex        : "2",
    email      : "e10@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000010"
  },
  {
    code       : "EMP0000002",
    name       : "Employee 200",
    dateOfBirth: "",
    sex        : "0",
    email      : "e200@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U000000200"
  }
];

class EmployeeApi {
  static getEmployees(page = 1, pageSize = 5) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], employees.slice((page - 1) * pageSize, pageSize)));
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
          employees.splice(existingEmployeeIndex, 1, employee);
        }

        resolve(employee);
      }, DELAY);
    });
  }
}

export default EmployeeApi;
