import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as loginActions from "../actions/loginActions";
import { PageHeader, FormGroup, ControlLabel, FormControl, Checkbox, Button } from "react-bootstrap";

class LoginPage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <PageHeader>Login</PageHeader>

        <FormGroup controlId="username">
          <ControlLabel htmlFor="username">Username</ControlLabel>
          <FormControl type="text" placeholder="Username" name="username"/>
        </FormGroup>

        <FormGroup controlId="password">
          <ControlLabel htmlFor="password">Password</ControlLabel>
          <FormControl type="password" placeholder="Password" name="password"/>
        </FormGroup>

        <FormGroup controlId="rememberMe">
          <Checkbox id="rememberMe">
            Remember me
          </Checkbox>
        </FormGroup>

        <Button id="submit" bsStyle="primary" className="pull-left">
          Login
        </Button>

        <Button id="forgotPassword" bsStyle="link" className="pull-right">
          Forgot Password
        </Button>
      </div>
    );
  }
}

LoginPage.propTypes = {
  actions: React.PropTypes.shape(
    {
      login: React.PropTypes.func.isRequired
    }
  ).isRequired
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
