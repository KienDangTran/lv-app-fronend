import React from 'react';
import {
  PageHeader,
  Panel,
  FormGroup,
  Row,
  Col,
  Clearfix,
  ControlLabel,
  FormControl,
  Radio,
  HelpBlock,
  ButtonToolbar,
  Button,
  Glyphicon
} from 'react-bootstrap';

const EmployeeForm = ({ employee, onChange, validationState, helpTexts, disabled, readOnly }) => {

  const panelFooter = readOnly
    ? ( <Button bsStyle="primary"><Glyphicon glyph="pencil"/> Edit</Button> )
    : ( <ButtonToolbar>
    < Button bsStyle="primary"><Glyphicon glyph="floppy-disk"/> Save</Button>
    <Button><Glyphicon glyph="remove"/> Cancel</Button>
  </ButtonToolbar> );

  return (
    <div>
      <PageHeader>Employee Details</PageHeader>
      <Panel header={ <h3>Basic Information</h3> } footer={ panelFooter } bsStyle="primary">
        <Row className="show-grid">
          <Col xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
            <FormGroup validationState={ helpTexts.code ? validationState : undefined } controlId="code">
              <Col xs={ 12 } sm={ 12 } md={ 3 } lg={ 3 }>
                <ControlLabel htmlFor="code">Employee Code</ControlLabel>
              </Col>
              <Col xs={ 12 } sm={ 12 } md={ 9 } lg={ 9 }>
                <FormControl
                  type="text"
                  name="code"
                  value={ employee.code }
                  disabled={ disabled }
                  readOnly={ readOnly }
                  onChange={ onChange }/>
                <HelpBlock>{ helpTexts.code }</HelpBlock>
              </Col>
            </FormGroup>
          </Col>

          <Col xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
            <FormGroup validationState={ helpTexts.name ? validationState : undefined } controlId="name">
              <Col xs={ 12 } sm={ 12 } md={ 3 } lg={ 3 }>
                <ControlLabel htmlFor="name">Employee Name</ControlLabel>
              </Col>
              <Col xs={ 12 } sm={ 12 } md={ 9 } lg={ 9 }>
                <FormControl
                  type="text"
                  name="name"
                  value={ employee.name }
                  disabled={ disabled }
                  readOnly={ readOnly }
                  onChange={ onChange }/>
                <HelpBlock>{ helpTexts.name }</HelpBlock>
              </Col>
            </FormGroup>
          </Col>

          <Clearfix/>
        </Row>

        <Row className="show-grid">
          <Col xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
            <FormGroup validationState={ helpTexts.dateOfBirth ? validationState : undefined }
                       controlId="dateOfBirth">
              <Col xs={ 12 } sm={ 12 } md={ 3 } lg={ 3 }>
                <ControlLabel htmlFor="dateOfBirth">Date Of Birth</ControlLabel>
              </Col>
              <Col xs={ 12 } sm={ 12 } md={ 9 } lg={ 9 }>
                <FormControl
                  type="text"
                  name="dateOfBirth"
                  value={ employee.dateOfBirth }
                  disabled={ disabled }
                  readOnly={ readOnly }
                  onChange={ onChange }/>
                <HelpBlock>{ helpTexts.dateOfBirth }</HelpBlock>
              </Col>
            </FormGroup>
          </Col>

          <Col xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
            <FormGroup validationState={ helpTexts.sex ? validationState : undefined } controlId="sex">
              <Col xs={ 12 } sm={ 12 } md={ 3 } lg={ 3 }>
                <ControlLabel htmlFor="sex">Sex</ControlLabel>
              </Col>
              <Col xs={ 12 } sm={ 12 } md={ 9 } lg={ 9 }>
                <Radio
                  inline
                  validationState={ helpTexts.sex ? validationState : undefined }
                  name="sex"
                  value={ 0 }
                  disabled={ disabled }
                  onChange={ onChange }
                >
                  Male
                </Radio>
                <Radio
                  inline
                  validationState={ helpTexts.sex ? validationState : undefined }
                  name="sex"
                  value={ 1 }
                  disabled={ disabled }
                  onChange={ onChange }
                >
                  Female
                </Radio>
                <Radio
                  inline
                  validationState={ helpTexts.sex ? validationState : undefined }
                  name="sex"
                  value={ 2 }
                  disabled={ disabled }
                  onChange={ onChange }
                >
                  Other
                </Radio>
                <HelpBlock>{ helpTexts.sex }</HelpBlock>
              </Col>
            </FormGroup>
          </Col>

          <Clearfix/>
        </Row>

        <Row className="show-grid">
          <Col xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
            <FormGroup validationState={ helpTexts.email ? validationState : undefined } controlId="email">
              <Col xs={ 12 } sm={ 12 } md={ 3 } lg={ 3 }>
                <ControlLabel htmlFor="email">Email</ControlLabel>
              </Col>
              <Col xs={ 12 } sm={ 12 } md={ 9 } lg={ 9 }>
                <FormControl
                  type="email"
                  name="email"
                  value={ employee.email }
                  disabled={ disabled }
                  readOnly={ readOnly }
                  onChange={ onChange }/>
                <HelpBlock>{ helpTexts.email }</HelpBlock>
              </Col>
            </FormGroup>
          </Col>

          <Col xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
            <FormGroup validationState={ helpTexts.phone ? validationState : undefined } controlId="phone">
              <Col xs={ 12 } sm={ 12 } md={ 3 } lg={ 3 }>
                <ControlLabel htmlFor="phone">Phone No.</ControlLabel>
              </Col>
              <Col xs={ 12 } sm={ 12 } md={ 9 } lg={ 9 }>
                <FormControl
                  type="tel"
                  name="phone"
                  value={ employee.phone }
                  disabled={ disabled }
                  readOnly={ readOnly }
                  onChange={ onChange }/>
                <HelpBlock>{ helpTexts.phone }</HelpBlock>
              </Col>
            </FormGroup>
          </Col>

          <Clearfix/>
        </Row>
      </Panel>
    </div>
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
  readOnly : true
};

export default EmployeeForm;
