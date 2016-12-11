import React from "react";
import { connect } from "react-redux";
import { loadEmployees } from "../../../actions/employee/employeeActions";
import { PageHeader, Modal, Glyphicon, ButtonToolbar, Button, Pagination } from "react-bootstrap";
import EmployeeList from "../../../components/employee/main/EmployeeList";

const loadData = ({ loadEmployees }) => {
  loadEmployees();
};

class EmployeeSummaryPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state      = { showModal: false, };
    this.openModal  = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    loadData(nextProps);
  }

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

        <EmployeeList employees={ Object.values(this.props.employees) } deleteRow={ this.openModal }/>
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
          prev={ this.props.employeePagination.pageCount > 0 }
          next={ this.props.employeePagination.pageCount > 0 && !this.props.employeePagination.nextPageUrl }
          first={ this.props.employeePagination.pageCount > 0 }
          last={ this.props.employeePagination.pageCount > 0 }
          ellipsis
          boundaryLinks
          items={ this.props.employeePagination.pageCount }
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
  employeePagination: React.PropTypes.object,
  employees         : React.PropTypes.object,
  loadEmployees     : React.PropTypes.func.isRequired
};

EmployeeSummaryPage.defaultProps = {
  employeePagination: { ids: [] },
  employees         : {},
};

function mapStateToProps(state) {
  return {
    employeePagination: state.pagination.employeePage || { ids: [] },
    employees         : state.entities.employees
  };
}

function mapDispatchToProps() {
  return { loadEmployees };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSummaryPage);
