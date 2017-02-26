import React from "react";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as employeeActions from "../../../actions/employeeActions";
import EmployeeList from "../presenters/EmployeeList";
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

class EmployeeSummaryPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { showModal: false };
    this.redirectToPage = this.redirectToPage.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchEmployees(this.props.activePage, this.props.pageSize);
    this.props.actions.countEmployees();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activePage !== this.props.activePage || nextProps.pageSize !== this.props.pageSize) {
      this.props.actions.fetchEmployees(nextProps.activePage, nextProps.pageSize);
      this.props.actions.countEmployees();
    }
  }

  redirectToPage(pageNo, pageSize) {
    this.props.router.push(`${this.props.location.pathname}?pageNo=${pageNo}&pageSize=${pageSize}`);
  }

  render() {
    const openDeleteDialog = () => { this.setState({ showModal: true }); };
    const deleteDialogAction = () => {
      this.setState({ showModal: false });
    };
    const deleteDialog = (
      <Modal
        show={ this.state.showModal }
        onHide={ deleteDialogAction }
        container={ this }
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header className="alert alert-warning">
          <Modal.Title><Glyphicon glyph="warning-sign" /> Warning!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Do you really want to delete this employee?</h4>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={ deleteDialogAction }>Yes</Button>
            <Button onClick={ deleteDialogAction }>No</Button>
          </ButtonToolbar>
        </Modal.Body>
      </Modal>
    );

    const activePage = this.props.activePage;
    const pageSize = this.props.pageSize;
    const fetching = this.props.fetching;
    const pageSizeValues = [5, 10, 25, 50];
    const pageSizeSelector = (
      <div>
        Items per page:
        <DropdownButton
          id="pageSizeSelection"
          title={ pageSize }
          bsStyle="link"
          disabled={ fetching }
          onSelect={ (e) => this.redirectToPage(1, pageSizeValues[e]) }
        >
          {
            pageSizeValues.map((value, index) => <MenuItem key={ index } eventKey={ index }>{ value }</MenuItem>)
          }
        </DropdownButton>
      </div>
    );

    const pageCount = this.props.pageCount;
    const pagination = (
      <Pagination
        first={ pageCount > 1 && activePage > 1 }
        prev={ pageCount > 1 && activePage > 1 }
        next={ pageCount > 1 && activePage < pageCount }
        last={ pageCount > 1 && activePage < pageCount }
        ellipsis
        items={ pageCount }
        maxButtons={ 10 }
        activePage={ activePage }
        onSelect={ (e) => this.redirectToPage(e, pageSize) }
        className="pull-right"
      />
    );

    return (
      <div>
        <PageHeader>Employee Summary</PageHeader>
        { pageSizeSelector }
        <EmployeeList
          employees={ this.props.employees }
          deleteRow={ openDeleteDialog }
          disabled={ fetching }
        />
        { deleteDialog }
        { pagination }
      </div>
    );
  }
}

EmployeeSummaryPage.propTypes = {
  activePage: React.PropTypes.number.isRequired,
  pageSize: React.PropTypes.number.isRequired,
  pageCount: React.PropTypes.number.isRequired,
  fetching: React.PropTypes.bool.isRequired,
  employees: React.PropTypes.array.isRequired,
  actions: React.PropTypes.shape(
    {
      countEmployees: React.PropTypes.func.isRequired,
      fetchEmployees: React.PropTypes.func.isRequired
    }
  ).isRequired,
  location: React.PropTypes.shape(
    {
      pathname: React.PropTypes.string.isRequired,
      query: React.PropTypes.object.isRequired
    }
  ).isRequired,
  router: React.PropTypes.shape(
    {
      push: React.PropTypes.func.isRequired
    }
  ).isRequired
};

const mapStateToProps = (state, ownProps) => {
  let {
    entities: { employee },
    pagination: { employee: { activePage, pageSize, pageCount, fetching, pages } }
  } = state;

  if (ownProps && ownProps.location.query) {
    activePage = ownProps.location.query.pageNo ? parseInt(ownProps.location.query.pageNo) : activePage;
    pageSize = ownProps.location.query.pageSize ? parseInt(ownProps.location.query.pageSize) : pageSize;
  }

  const employees = pages[activePage] ? pages[activePage].ids.map(id => employee[id]) : [];

  return {
    activePage,
    pageSize,
    pageCount,
    fetching,
    employees
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(employeeActions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeeSummaryPage));
