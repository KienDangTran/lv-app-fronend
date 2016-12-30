import React from "react";
import { Link } from "react-router";
import { Table, Glyphicon, Button } from "react-bootstrap";
import * as path from "../../constants/paths";

const EmployeeList = ({ employees, deleteRow }) => {
  return (
    <Table responsive striped>
      <thead>
      <tr>
        <th/>
        <th>Employee Code</th>
        <th>Employee Name</th>
      </tr>
      </thead>
      <tbody>
      {
        employees.map((employee, index) => {
          return (
            <tr key={ index }>
              <td>
                <input type="checkbox" name="eSelect"/>
                <Button bsStyle="link" bsSize="xsmall" onClick={ deleteRow }>
                  <Glyphicon glyph="trash"/>
                </Button>
              </td>
              <td>
                <Link to={`${path.EMPLOYEE}/${employee.code }`}>{ employee.code }</Link>
              </td>
              <td>{ employee.name }</td>
            </tr>
          );
        })
      }
      </tbody>
    </Table>
  );
};

EmployeeList.propTypes = {
  employees: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  deleteRow: React.PropTypes.func.isRequired,
};

export default EmployeeList;
