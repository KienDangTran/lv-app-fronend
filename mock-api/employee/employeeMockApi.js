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
    userId     : "U0000008"
  },
  {
    code       : "EMP0009",
    name       : "Employee 9",
    dateOfBirth: "1991-09-12",
    sex        : "2",
    email      : "e10@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000009"
  },
  {
    code       : "EMP00010",
    name       : "Employee 200",
    dateOfBirth: "",
    sex        : "0",
    email      : "e200@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000010"
  },
  {
    code       : "EMP00011",
    name       : "Employee 1",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e1@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000011"
  },
  {
    code       : "EMP00012",
    name       : "Employee 2",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e2@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000012"
  },
  {
    code       : "EMP00013",
    name       : "Employee 3",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e3@example.com",
    phone      : "01648172820",
    status     : "0",
    userId     : "U0000013"
  },
  {
    code       : "EMP00014",
    name       : "Employee 4",
    dateOfBirth: "1991-09-12",
    sex        : "0",
    email      : "e4@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000014"
  },
  {
    code       : "EMP00015",
    name       : "Employee 5",
    dateOfBirth: "1991-09-12",
    sex        : "2",
    email      : "e5@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000015"
  },
  {
    code       : "EMP00016",
    name       : "Employee 6",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e6@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000016"
  },
  {
    code       : "EMP00017",
    name       : "Employee 7",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e7@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000017"
  },
  {
    code       : "EMP00018",
    name       : "Employee 8",
    dateOfBirth: "1991-09-12",
    sex        : "1",
    email      : "e9@example.com",
    phone      : "01648172820",
    status     : "0",
    userId     : "U0000018"
  },
  {
    code       : "EMP00019",
    name       : "Employee 10",
    dateOfBirth: "1991-09-12",
    sex        : "2",
    email      : "e10@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U0000019"
  },
  {
    code       : "EMP000020",
    name       : "Employee 200",
    dateOfBirth: "",
    sex        : "0",
    email      : "e200@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U00000020"
  },
  {
    code       : "EMP000022",
    name       : "Employee 200",
    dateOfBirth: "",
    sex        : "0",
    email      : "e200@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U00000022"
  },
  {
    code       : "EMP000021",
    name       : "Employee 200",
    dateOfBirth: "",
    sex        : "0",
    email      : "e200@example.com",
    phone      : "01648172820",
    status     : "1",
    userId     : "U00000021"
  }
];

class EmployeeApi {

  /**
   *
   * @param pageNo
   * @param pageSize
   * @returns {Promise}
   */
  static getEmployees(pageNo = 1, pageSize = 5) {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            if (pageNo === 3 && pageSize === 5) {
              reject(
                {
                  pageNo,
                  pageSize,
                  message: "Not found",
                  status : 404
                }
              );
            }

            if (pageNo === 4 && pageSize === 5) {
              reject(
                {
                  pageNo,
                  pageSize,
                  message: "Request time out",
                  status : 500
                }
              );
            }

            resolve(
              {
                pageNo,
                pageSize,
                pageCount: Math.ceil(employees.length / pageSize),
                employees: employees.slice((pageNo - 1) * pageSize, pageSize * pageNo)
              }
            );
          }, Math.random() * 2000 + 1000
        );
      }
    );
  }

  static saveEmployee(employee) {
    employee = Object.assign({}, employee);
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            if (employee.name.length < 3) {
              reject("Employee Name must be at least than 3 characters");
            }

            if (employee.code) {
              const existingEmployeeIndex = employees.findIndex(e => e.code === employee.code);
              employees.splice(existingEmployeeIndex, 1, employee);
            }

            resolve(employee);
          }, Math.random() * 2000 + 1000
        );
      }
    );
  }
}

export default EmployeeApi;
