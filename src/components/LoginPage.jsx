import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../actions/sessionActions';
import { PageHeader, Jumbotron, Checkbox, Button, Alert } from 'react-bootstrap';
import FieldGroup from './common/FieldGroup';

class LoginPage extends React.Component {
  static propTypes = {
    error: React.PropTypes.string,
    actions: React.PropTypes.shape({
      login: React.PropTypes.func.isRequired
    }).isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: ''
    };
    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUsernameChanged(e) {
    this.setState(
      {
        username: e.target.value
      }
    );
  }

  onPasswordChanged(e) {
    this.setState(
      {
        password: e.target.value
      }
    );
  }

  onSubmit() {
    this.props.actions.login(this.state.username, this.state.password);
  }

  render() {
    return (
      <Jumbotron>
        <PageHeader>Login</PageHeader>

        {
          this.props.error
            ? <Alert bsStyle="danger">
              {this.props.error}
            </Alert>
            : undefined
        }

        <FieldGroup
          id="username"
          label="Username"
          type="text"
          placeholder="Username"
          name="username"
          onChange={this.onUsernameChanged}
        />

        <FieldGroup
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={this.onPasswordChanged}
        />

        <Checkbox id="rememberMe"> Remember me </Checkbox>

        <Button
          id="submit"
          bsStyle="primary"
          className="pull-left"
          onClick={this.onSubmit}
        >
          Login
        </Button>

        <Button
          id="forgotPassword"
          bsStyle="link"
          className="pull-right"
        >
          Forgot Password
        </Button>

      </Jumbotron>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.session.error.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
