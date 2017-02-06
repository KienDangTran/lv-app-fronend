import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as employeeActions from "../../../actions/employeeActions";
import EmployeeForm from "../presenters/EmployeeForm";

class EmployeeDetailsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state    = {
      employee: Object.assign({}, this.props.employee),
      errors  : {}
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange() {

  }

  render() {
    return (
      <EmployeeForm
        employee={ this.state.employee }
        helpText={ this.state.errors }
        onChange={ this.onChange }/>
    );
  }
}

EmployeeDetailsPage.propTypes = {
  employee: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) { // eslint-disable-line no-unused-vars
  const employee = {
    code       : '',
    name       : '',
    dateOfBirth: '',
    sex        : '',
    email      : '',
    phone      : '',
    status     : '',
    userId     : ''
  };
  return { employee: employee };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(employeeActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailsPage);
