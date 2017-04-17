import React from 'react';
import { connect } from 'react-redux';
import LoginPage from './LoginPage';

class HomePage extends React.Component {
  static propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired
  }

  render() {
    return (
      this.props.isAuthenticated
        ? <div className="jumbotron">
          <h1>Application</h1>

          <h2>Get Started</h2>
          <ol>
            <li>- npm install</li>
            <li>- npm start</li>
          </ol>
        </div>
        : <LoginPage />
    );
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.session.isAuthenticated };
};

export default connect(mapStateToProps)(HomePage);
