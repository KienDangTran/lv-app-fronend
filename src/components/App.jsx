import React from 'react';
import { connect } from 'react-redux';
import Header from './common/Header';
import { Grid, Row, Col } from 'react-bootstrap';
import * as nav from '../constants/navPaths';

window.$ = window.jQuery = require('jquery');

class App extends React.Component {
  static propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    children: React.PropTypes.element,
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string.isRequired,
      query: React.PropTypes.object.isRequired
    }).isRequired,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired
    }).isRequired
  }

  componentDidUpdate(prevProps) {
    const isLoggingOut = prevProps.isAuthenticated && !this.props.isAuthenticated;
    const isLoggingIn = !prevProps.isAuthenticated && this.props.isAuthenticated;

    if (isLoggingIn) {
      this.props.router.push(
        this.props.location.query.redirectTo !== undefined
          ? this.props.location.query.redirectTo
          : nav.APP
      );
    } else if (isLoggingOut) {
      // do any kind of cleanup or post-logout redirection here
    }
  }

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

const mapStateToProps = (state) => {
  const { session: { isAuthenticated } } = state;
  return { isAuthenticated };
};

export default connect(mapStateToProps)(App);
