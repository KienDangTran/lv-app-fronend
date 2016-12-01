import React from "react";
import { Link } from "react-router";
import { Table, Glyphicon, Button, Modal, ButtonToolbar } from "react-bootstrap";

class EmployeeList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { showModal: false };
  }

  closeModal() {
    this.setState(Object.assign({}, this.state, { showModal: false }));
  }

  openModal() {
    this.setState(Object.assign({}, this.state, { showModal: true }));
  }

  render() {
    const modal = (
      <Modal
        show={ this.state.showModal }
        onHide={ () => this.closeModal() }
        container={ this }
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Do you really want to delete this employee?</h4>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={ () => this.closeModal() }>Yes</Button>
            <Button bsStyle="danger" onClick={ () => this.closeModal() }>No</Button>
          </ButtonToolbar>
        </Modal.Body>
      </Modal>
    );
    return (
      <Table responsive>
        <thead>
        <tr>
          <td/>
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
          this.props.employees && this.props.employees.length > 0
            ? this.props.employees.map((employee, index) => {
            return (
              <tr key={ index }>
                <td>
                  <input type="checkbox" name="eSelect"/>
                  <Button bsStyle="link" bsSize="xsmall" onClick={ () => this.openModal() }>
                    <Glyphicon glyph="trash"/>
                  </Button>
                  { modal }
                </td>
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
      </Table>
    );
  }
}

EmployeeList.initialState = {
  showModal: false
};

EmployeeList.propTypes = {
  employees: React.PropTypes.array.isRequired
};

export default EmployeeList;
