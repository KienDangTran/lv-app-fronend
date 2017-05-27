import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import * as path from '../../constants/navPaths';
import * as sessionAction from '../../actions/sessionActions';

class Header extends React.Component {
  static propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired, actions: React.PropTypes.shape({
      logout: React.PropTypes.func.isRequired
    }).isRequired,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
      isActive: React.PropTypes.func.isRequired
    }).isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.navigate = this.navigate.bind(this);
    this.isActive = this.isActive.bind(this);
    this.logout = this.logout.bind(this);
  }

  navigate(href) {
    this.props.router.push(href);
  }

  isActive(href, indexOnly = false) {
    return this.props.router.isActive(href, indexOnly);
  }

  logout() {
    this.props.actions.logout();
    this.props.router.push(path.APP);
  }

  render() {
    const renderUserInfo = () => {
      return (
        <Nav pullRight>
          <NavItem href="#">Welcome, Admin! <Glyphicon glyph="user" /></NavItem>
          <NavItem href="#" onClick={ this.logout }>Logout <Glyphicon glyph="log-out" /></NavItem>
        </Nav>
      );
    };

    const renderMenuItems = () => {
      return (
        <Nav>
          <NavItem
            eventKey={ 1 }
            href={ path.APP }
            onClick={ () => this.navigate(path.APP) }
            active={ this.isActive(path.APP, true) }
          >
            Home
            </NavItem>

          <NavItem
            eventKey={ 2 }
            href={ path.EMPLOYEE }
            onClick={ () => this.navigate(path.EMPLOYEE) }
            active={ this.isActive(path.EMPLOYEE) }
          >
            Employee
            </NavItem>
          <NavItem
            eventKey={ 2 }
            href={ path.USER }
            onClick={ () => this.navigate(path.USER) }
            active={ this.isActive(path.USER) }
          >
            User
            </NavItem>
          <NavItem
            eventKey={ 3 }
            href={ path.ABOUT }
            onClick={ () => this.navigate(path.ABOUT) }
            active={ this.isActive(path.ABOUT) }
          >
            About
            </NavItem>
        </Nav>
      );
    };

    return (
      <Navbar inverse collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="navbar-brand">
              <img alt="Brand" src={ require('../../images/branch.png') } />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          { this.props.isLoggedIn ? renderMenuItems() : null }
          { this.props.isLoggedIn ? renderUserInfo() : null }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.session.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(sessionAction, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
