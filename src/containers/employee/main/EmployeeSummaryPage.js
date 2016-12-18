import React from "react";
import { connect } from "react-redux";
import { loadEmployees } from "../../../actions/employee/employeeActions";
import { PageHeader, Modal, Glyphicon, ButtonToolbar, Button, Pagination } from "react-bootstrap";
import EmployeeList from "../../../components/employee/main/EmployeeList";

class EmployeeSummaryPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state      = { showModal: false, };
    this.openModal  = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadEmployees());
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
  fetching          : React.PropTypes.bool,
  dispatch          : React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    employeePagination: state.paginations.pages || { ids: [] },
    employees         : state.employees,
    fetching          : state.paginations.fetching
  };
}

export default connect(mapStateToProps)(EmployeeSummaryPage);
