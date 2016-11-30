import React from "react";
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";

const EmployeeForm = ({ employee, onChange, validationState, helpTexts, disabled, readOnly }) => {
  return (
    <Form horizontal>
      <FormGroup validationState={ helpTexts.code ? validationState : undefined }>
        <ControlLabel htmlFor="ecode">Employee Code</ControlLabel>
        <FormControl type="text" name="ecode" value={ employee.code } disabled={ disabled } readOnly={ readOnly }
                     onChange={ onChange }/>
        <HelpBlock>{ helpTexts.code }</HelpBlock>
      </FormGroup>
      <FormGroup validationState={ helpTexts.name ? validationState : undefined }>
        <ControlLabel htmlFor="ename">Employee Name</ControlLabel>
        <FormControl type="text" name="ename" value={ employee.name } disabled={ disabled } readOnly={ readOnly }
                     onChange={ onChange }/>
        <HelpBlock>{ helpTexts.name }</HelpBlock>
      </FormGroup>
    </Form>
  );
};

EmployeeForm.propTypes = {
  employee       : React.PropTypes.object.isRequired,
  onChange       : React.PropTypes.func,
  validationState: React.PropTypes.string,
  helpTexts      : React.PropTypes.object,
  disabled       : React.PropTypes.bool,
  readOnly       : React.PropTypes.bool
};

EmployeeForm.defaultProps = {
  helpTexts: {},
  disabled : false,
  readOnly : false
};

export default EmployeeForm;
