import React from "react";
import { withRouter } from 'react-router';
import { Navbar, Nav, NavItem, Glyphicon } from "react-bootstrap";
import * as path from "../../constants/paths";

class Header extends React.Component {
  render() {
    const navigate = (href) => {
      this.props.router.push(href);
    };
    return (
      <Navbar inverse collapseOnSelect fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="navbar-brand" href={ path.APP }> <img alt="Brand" src={ require("../../images/branch.png") }/>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={ 1 } href={ path.APP } onClick={ () => navigate(path.APP) }>Home</NavItem>
            <NavItem eventKey={ 2 } href={ path.EMPLOYEES } onClick={ () => navigate(path.EMPLOYEES) }>
              Employee
            </NavItem>
            <NavItem eventKey={ 3 } href={ path.ABOUT } onClick={ () => navigate(path.ABOUT) }>About</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem href="#">Welcome, Admin! <Glyphicon glyph="user"/></NavItem>
            <NavItem href="#"><Glyphicon glyph="log-out"/></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  router: React.PropTypes.shape({ push: React.PropTypes.func.isRequired }).isRequired
};

export default withRouter(Header);
