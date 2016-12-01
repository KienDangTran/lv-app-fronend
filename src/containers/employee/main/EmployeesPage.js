import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Panel } from "react-bootstrap";
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
      <Panel>
        <h2>Employees Summary</h2>
        <EmployeeList employees={ this.props.employees }/>
      </Panel>
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
