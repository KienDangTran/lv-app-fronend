import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as employeeActions from "../../../actions/employee/employeeActions";
import EmployeeList from "../../../components/employee/main/EmployeeList";
// import { browserHistory } from "react-router";
// import * as Paths from "../../constants/paths";

class EmployeesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.redirectToEmployeePage = this.redirectToEmployeePage().bind(this);
  }

  // redirectToEmployeePage() {
  //   browserHistory.push(Paths.EMPLOYEE_DETAILS);
  // }

  render() {
    return (
      <div className="jumbotron">
        <h1>Employees</h1>
        <EmployeeList employees={ this.props.employees }/>
      </div>
    );
  }
}

EmployeesPage.propTypes = {
  employees: React.PropTypes.array.isRequired,
  actions  : React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { employees: state.employees };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(employeeActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesPage);
