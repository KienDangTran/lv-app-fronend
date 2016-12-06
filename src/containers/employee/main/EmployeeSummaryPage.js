import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PageHeader, Modal, Glyphicon, ButtonToolbar, Button, Pagination } from "react-bootstrap";
import * as employeeActions from "../../../actions/employee/employeeActions";
import EmployeeList from "../../../components/employee/main/EmployeeList";
// import { browserHistory } from "react-router";
// import * as Paths from "../../constants/paths";

class EmployeeSummaryPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state        = { showModal: false, };
    this.openModal    = this.openModal.bind(this);
    this.closeModal   = this.closeModal.bind(this);
    // this.redirectToEmployeePage = this.redirectToEmployeePage().bind(this);
  }

  // redirectToEmployeePage() {
  //   browserHistory.push(Paths.EMPLOYEE_DETAILS);
  // }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <PageHeader>Employee Summary</PageHeader>

        <EmployeeList employees={ this.props.employees } deleteRow={ this.openModal }/>
        <Modal
          show={ this.state.showModal }
          onHide={ this.closeModal }
          container={ this }
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header className="alert alert-warning">
            <Modal.Title><Glyphicon glyph="warning-sign"/> Warning!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Do you really want to delete this employee?</h4>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={ this.closeModal }>Yes</Button>
              <Button onClick={ this.closeModal }>No</Button>
            </ButtonToolbar>
          </Modal.Body>
        </Modal>

        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={ 5 }
          maxButtons={ 5 }
          activePage={ 1 }
          onSelect={ () => {} }
          className="pull-right"
        />
      </div>
    );
  }
}

EmployeeSummaryPage.propTypes = {
  employees: React.PropTypes.array.isRequired,
  actions  : React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { employees: state.employees };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(employeeActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSummaryPage);
