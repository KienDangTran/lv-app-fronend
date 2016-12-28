import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as employeeActions from "../../../actions/employee/employeeActions";
import {
  PageHeader,
  Modal,
  Glyphicon,
  ButtonToolbar,
  Button,
  Pagination,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import EmployeeList from "../../../components/employee/main/EmployeeList";

class EmployeeSummaryPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state      = { showModal: false };
    this.openModal  = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.moveToPage = this.moveToPage.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadEmployees(this.props.employeePagination.currentPage, this.props.employeePagination.pageSize);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  moveToPage(pageNo) {
    this.props.actions.loadEmployees(pageNo, this.props.employeePagination.pageSize);
  }

  render() {
    const deleteDialog = (
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
    );

    const currentPage      = this.props.employeePagination.currentPage;
    const pageSize         = this.props.employeePagination.pageSize;
    const pageSizeValues   = [5, 10, 25, 50];
    const selectPageSize   = (eventKey) => this.props.actions.loadEmployees(
      currentPage,
      pageSizeValues[eventKey]
    );
    const pageSizeSelector = (
      <div>
        Items per page:
        <DropdownButton id="pageSizeSelection" title={ pageSize } bsStyle="link" onSelect={ selectPageSize }>
          {
            pageSizeValues.map((value, index) => <MenuItem key={index} eventKey={ index }>{ value }</MenuItem>)
          }
        </DropdownButton>
      </div>
    );

    const pageCount  = this.props.employeePagination.pageCount;
    const pagination = (
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
    );

    return (
      <div>
        <PageHeader>Employee Summary</PageHeader>
        { pageSizeSelector }
        <EmployeeList employees={ this.props.employees } deleteRow={ this.openModal }/>
        { deleteDialog }
        { pagination }
      </div>
    );
  }
}

EmployeeSummaryPage.propTypes = {
  actions           : React.PropTypes.object.isRequired,
  employeePagination: React.PropTypes.object,
  employees         : React.PropTypes.array,
};

const mapStateToProps = (state) => {
  const {
          entities: { employees },
          pagination: { employeePagination }
        } = state;

  return {
    employeePagination: employeePagination,
    employees         : employeePagination.pages[employeePagination.currentPage].ids.map(id => employees[id]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(employeeActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSummaryPage);
