import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as employeeActions from "../../../actions/employee/employeeActions";
import { PageHeader, Modal, Glyphicon, ButtonToolbar, Button, Pagination } from "react-bootstrap";
import EmployeeList from "../../../components/employee/main/EmployeeList";

class EmployeeSummaryPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state      = { showModal: false, };
    this.openModal  = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.moveToPage = this.moveToPage.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadEmployees(this.props.pagination.currentPage);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  moveToPage(pageNo) {
    this.props.actions.loadEmployees(pageNo);
  }

  render() {
    const currentPage = this.props.pagination.currentPage;
    const pageCount   = this.props.pagination.pageCount;

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
          first={ pageCount > 1 && currentPage > 1 }
          prev={ pageCount > 1 && currentPage > 1 }
          next={ pageCount > 1 && currentPage < pageCount }
          last={ pageCount > 1 && currentPage < pageCount }
          ellipsis
          items={ pageCount }
          maxButtons={ 10 }
          activePage={ currentPage }
          onSelect={ this.moveToPage }
          className="pull-right"
        />

      </div>
    );
  }
}

EmployeeSummaryPage.propTypes = {
  actions   : React.PropTypes.object.isRequired,
  pagination: React.PropTypes.object,
  employees : React.PropTypes.array,
};

const mapStateToProps = (state) => {
  const {
          employees,
          pagination: { pages, currentPage, pageSize, pageCount }
        } = state;

  return {
    pagination: { pages, currentPage, pageSize, pageCount },
    employees : Object.values(employees).filter(e => pages[currentPage].ids.indexOf(e.code) > 0),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(employeeActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSummaryPage);
