const employees = [
  {
    employeeCode: 'EMP00001',
    employeeName: 'Employee 1',
    dateOfBirth: '1991-09-12',
    sex: '1',
    email: 'e1@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000001'
  },
  {
    employeeCode: 'EMP00002',
    employeeName: 'Employee 2',
    dateOfBirth: '1991-09-12',
    sex: '1',
    email: 'e2@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000002'
  },
  {
    employeeCode: 'EMP00003',
    employeeName: 'Employee 3',
    dateOfBirth: '1991-09-12',
    sex: '1',
    email: 'e3@example.com',
    phoneNo: '01648172820',
    status: '0',
    userId: 'U0000003'
  },
  {
    employeeCode: 'EMP00004',
    employeeName: 'Employee 4',
    dateOfBirth: '1991-09-12',
    sex: '0',
    email: 'e4@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000004'
  },
  {
    employeeCode: 'EMP00005',
    employeeName: 'Employee 5',
    dateOfBirth: '1991-09-12',
    sex: '2',
    email: 'e5@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000005'
  },
  {
    employeeCode: 'EMP00006',
    employeeName: 'Employee 6',
    dateOfBirth: '1991-09-12',
    sex: '1',
    email: 'e6@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000006'
  },
  {
    employeeCode: 'EMP00007',
    employeeName: 'Employee 7',
    dateOfBirth: '1991-09-12',
    sex: '1',
    email: 'e7@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000007'
  },
  {
    employeeCode: 'EMP00008',
    employeeName: 'Employee 8',
    dateOfBirth: '1991-09-12',
    sex: '1',
    email: 'e9@example.com',
    phoneNo: '01648172820',
    status: '0',
    userId: 'U0000008'
  },
  {
    employeeCode: 'EMP00009',
    employeeName: 'Employee 9',
    dateOfBirth: '1991-09-12',
    sex: '2',
    email: 'e10@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000009'
  },
  {
    employeeCode: 'EMP00010',
    employeeName: 'Employee 200',
    dateOfBirth: '',
    sex: '0',
    email: 'e200@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000010'
  },
  {
    employeeCode: 'EMP00011',
    employeeName: 'Employee 1',
    dateOfBirth: '1991-09-12',
    sex: '1',
    email: 'e1@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000011'
  },
  {
    employeeCode: 'EMP00012',
    employeeName: 'Employee 2',
    dateOfBirth: '1991-09-12',
    sex: '1',
    email: 'e2@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000012'
  },
  {
    employeeCode: 'EMP00013',
    employeeName: 'Employee 3',
    dateOfBirth: '1991-09-12',
    sex: '1',
    email: 'e3@example.com',
    phoneNo: '01648172820',
    status: '0',
    userId: 'U0000013'
  },
  {
    employeeCode: 'EMP00014',
    employeeName: 'Employee 4',
    dateOfBirth: '1991-09-12',
    sex: '0',
    email: 'e4@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000014'
  },
  {
    employeeCode: 'EMP00015',
    employeeName: 'Employee 5',
    dateOfBirth: '1991-09-12',
    sex: '2',
    email: 'e5@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000015'
  },
  {
    employeeCode: 'EMP00016',
    employeeName: 'Employee 6',
    dateOfBirth: '1991-09-12',
    sex: '1',
    email: 'e6@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000016'
  },
  {
    employeeCode: 'EMP00017',
    employeeName: 'Employee 7',
    dateOfBirth: '1991-09-12',
    sex: '1',
    email: 'e7@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000017'
  },
  {
    employeeCode: 'EMP00018',
    employeeName: 'Employee 8',
    dateOfBirth: '1991-09-12',
    sex: '1',
    email: 'e9@example.com',
    phoneNo: '01648172820',
    status: '0',
    userId: 'U0000018'
  },
  {
    employeeCode: 'EMP00019',
    employeeName: 'Employee 10',
    dateOfBirth: '1991-09-12',
    sex: '2',
    email: 'e10@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U0000019'
  },
  {
    employeeCode: 'EMP000020',
    employeeName: 'Employee 200',
    dateOfBirth: '',
    sex: '0',
    email: 'e200@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U00000020'
  },
  {
    employeeCode: 'EMP000021',
    employeeName: 'Employee 200',
    dateOfBirth: '',
    sex: '0',
    email: 'e200@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U00000021'
  },
  {
    employeeCode: 'EMP000022',
    employeeName: 'Employee 200',
    dateOfBirth: '',
    sex: '0',
    email: 'e200@example.com',
    phoneNo: '01648172820',
    status: '1',
    userId: 'U00000022'
  }
];

class EmployeeApi {
  /**
   *
   * @param pageNo
   * @param pageSize
   * @returns {Promise}
   */
  static fetchEmployees(pageNo = 1, pageSize = 10) {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            if (pageNo === 3 && pageSize === 5) {
              reject(
                {
                  message: 'Not found',
                  status: 404
                }
              );
            }

            if (pageNo === 4 && pageSize === 5) {
              reject(
                {
                  message: 'Request time out',
                  status: 500
                }
              );
            }

            resolve(employees.slice((pageNo - 1) * pageSize, pageSize * pageNo));
          },
          Math.random() * 2000 + 1000
        );
      }
    );
  }

  /**
   *
   * @returns {Promise}
   */
  static countEmployees() {
    return new Promise(
      (resolve) => {
        setTimeout(
          () => {
            resolve(employees.length);
          }
        );
      },
      Math.random() * 2000 + 1000
    );
  }

  static saveEmployee(employee) {
    employee = Object.assign({}, employee);
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            if (employee.name.length < 3) {
              reject('Employee Name must be at least than 3 characters');
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
