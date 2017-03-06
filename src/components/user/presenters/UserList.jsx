import React from 'react';
import { Table, Glyphicon, Button } from 'react-bootstrap';

const UserList = ({ users, deleteRow, disabled }) => {
  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th />
          <th>User ID</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(
            (user, index) => {
              return (
                <tr key={ index }>
                  <td>
                    <input type="checkbox" name="eSelect" disabled={ disabled } />
                    <Button bsStyle="link" bsSize="xsmall" onClick={ deleteRow } disabled={ disabled }>
                      <Glyphicon glyph="trash" />
                    </Button>
                  </td>
                  <td>{ user.userId }</td>
                  <td>{ user.username }</td>
                </tr>
              );
            }
          )
        }
      </tbody>
    </Table>
  );
};

UserList.propTypes = {
  users: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  deleteRow: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
};

export default UserList;
