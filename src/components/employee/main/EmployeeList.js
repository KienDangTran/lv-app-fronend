import React from "react";
import { Link } from "react-router";

const EmployeeList = ({ employees }) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <td>Employee Code</td>
        <td>Employee Name</td>
        <td>Sex</td>
        <td>Date of Birth</td>
        <td>Email</td>
        <td>Phone No.</td>
      </tr>
      </thead>
      <tbody>
      {
        employees && employees.length > 0
          ? employees.map((employee, index) => {
          return (
            <tr key={ index }>
              <td><Link to={ `employee/${employee.code}` }>{ employee.code }</Link></td>
              <td>{ employee.name }</td>
              <td>{ employee.sex }</td>
              <td>{ employee.dateOfBirth }</td>
              <td>{ employee.email }</td>
              <td>{ employee.phone }</td>
            </tr>
          );
        })
          : null
      }
      </tbody>
    </table>
  );
};

EmployeeList.propTypes = {
  employees: React.PropTypes.array.isRequired
};

export default EmployeeList;
