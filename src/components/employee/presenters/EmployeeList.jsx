import React from 'react';
import { Link } from 'react-router';
import { Table, Glyphicon, Button } from 'react-bootstrap';
import * as path from '../../../constants/navPaths';

const EmployeeList = ({ employees, deleteRow, disabled }) => {
  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th />
          <th>Employee Code</th>
          <th>Employee Name</th>
        </tr>
      </thead>
      <tbody>
        {
          employees.map(
            (employee, index) => {
              return (
                <tr key={ index }>
                  <td>
                    <input type="checkbox" name="eSelect" disabled={ disabled } />
                    <Button bsStyle="link" bsSize="xsmall" onClick={ deleteRow } disabled={ disabled }>
                      <Glyphicon glyph="trash" />
                    </Button>
                  </td>
                  <td>
                    <Link to={ `${path.EMPLOYEE}/${employee.employeeCode}` } disabled={ disabled }>
                      { employee.employeeCode }
                    </Link>
                  </td>
                  <td>{ employee.employeeName }</td>
                </tr>
              );
            }
          )
        }
      </tbody>
    </Table>
  );
};

EmployeeList.propTypes = {
  employees: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  deleteRow: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
};

export default EmployeeList;
