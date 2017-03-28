import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import * as path from '../../constants/navPaths';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.navigate = this.navigate.bind(this);
    this.isActive = this.isActive.bind(this);
  }
  navigate(href) {
    this.props.router.push(href);
  }
  isActive(href, indexOnly = false) {
    return this.props.router.isActive(href, indexOnly);
  }
  render() {
    const renderUserInfo = () => {
      return (
        <Nav pullRight>
          <NavItem href="#">Welcome, Admin! <Glyphicon glyph="user" /></NavItem>
          <NavItem href="#"><Glyphicon glyph="log-out" /></NavItem>
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
          { this.props.isAuthenticated ? renderMenuItems() : undefined }
          { this.props.isAuthenticated ? renderUserInfo() : undefined }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  router: React.PropTypes.shape(
    {
      push: React.PropTypes.func.isRequired,
      isActive: React.PropTypes.func.isRequired
    }
  ).isRequired
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.session.isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps)(Header));
