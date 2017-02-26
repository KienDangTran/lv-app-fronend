import React from "react";
import Header from "./common/Header";
import { Grid, Row, Col } from "react-bootstrap";

window.$ = window.jQuery = require("jquery");

class App extends React.Component {
  render() {
    return (
      <div>
        <Header id="header" />
        <Grid id="content" fluid>
          <Row>
            <Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 2 } />
            <Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 8 }>
              { this.props.children }
            </Col>
            <Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 2 } />
          </Row>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element
};

export default App;
