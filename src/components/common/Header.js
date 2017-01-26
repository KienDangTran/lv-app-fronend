import React from "react";
import { withRouter } from "react-router";
import { Navbar, Nav, NavItem, Glyphicon } from "react-bootstrap";
import * as path from "../../constants/navigations";

class Header extends React.Component {
  render() {
    const navigate = (href) => {
      this.props.router.push(href);
    };
    const isActive = (href, indexOnly = false) => {
      return this.props.router.isActive(href, indexOnly);
    };

    return (
      <Navbar inverse collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="navbar-brand" href={ path.APP }> <img alt="Brand" src={ require("../../images/branch.png") }/>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem
              eventKey={ 1 }
              href={ path.APP }
              onClick={ () => navigate(path.APP) }
              active={ isActive(path.APP, true) }
            >
              Home
            </NavItem>

            <NavItem
              eventKey={ 2 }
              href={ path.EMPLOYEE }
              onClick={ () => navigate(path.EMPLOYEE) }
              active={ isActive(path.EMPLOYEE) }
            >
              Employee
            </NavItem>
            <NavItem
              eventKey={ 2 }
              href={ path.USER }
              onClick={ () => navigate(path.USER) }
              active={ isActive(path.USER) }
            >
              User
            </NavItem>
            <NavItem
              eventKey={ 3 }
              href={ path.ABOUT }
              onClick={ () => navigate(path.ABOUT) }
              active={ isActive(path.ABOUT) }
            >
              About
            </NavItem>
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
  router: React.PropTypes.shape(
    {
      push    : React.PropTypes.func.isRequired,
      isActive: React.PropTypes.func.isRequired
    }
  ).isRequired
};

export default withRouter(Header);
