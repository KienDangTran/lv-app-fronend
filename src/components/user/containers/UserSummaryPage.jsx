import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../../actions/userActions';
import UserList from '../../../components/user/presenters/UserList';
import {
  PageHeader,
  Modal,
  Glyphicon,
  ButtonToolbar,
  Button,
  Pagination,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';

class UserSummaryPage extends React.Component {
  static propTypes = {
    activePage: React.PropTypes.number.isRequired,
    pageSize: React.PropTypes.number.isRequired,
    pageCount: React.PropTypes.number.isRequired,
    fetching: React.PropTypes.bool.isRequired,
    users: React.PropTypes.array.isRequired,
    actions: React.PropTypes.shape({
      countUsers: React.PropTypes.func.isRequired,
      fetchUsers: React.PropTypes.func.isRequired
    }).isRequired,
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string.isRequired,
      query: React.PropTypes.object.isRequired
    }).isRequired,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired
    }).isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = { showModal: false };
    this.redirectToPage = this.redirectToPage.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchUsers(this.props.activePage, this.props.pageSize);
    this.props.actions.countUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activePage !== this.props.activePage || nextProps.pageSize !== this.props.pageSize) {
      this.props.actions.fetchUsers(nextProps.activePage, nextProps.pageSize);
      this.props.actions.countUsers();
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
        <PageHeader>User Summary</PageHeader>
        { pageSizeSelector }
        <UserList
          users={ this.props.users }
          deleteRow={ openDeleteDialog }
          disabled={ fetching }
        />
        { deleteDialog }
        { pagination }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    entities: { user },
    pagination: { user: { pageCount, fetching, pages } }
  } = state;

  let activePage = state.pagination.user.activePage;
  let pageSize = state.pagination.user.pageSize;
  if (ownProps && ownProps.location.query) {
    activePage = ownProps.location.query.pageNo ? parseInt(ownProps.location.query.pageNo) : activePage;
    pageSize = ownProps.location.query.pageSize ? parseInt(ownProps.location.query.pageSize) : pageSize;
  }

  const users = pages[activePage] ? pages[activePage].ids.map(id => user[id]) : [];

  return {
    activePage,
    pageSize,
    pageCount,
    fetching,
    users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSummaryPage);
