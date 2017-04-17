import React from 'react';
import { connect } from 'react-redux';
import * as nav from '../constants/navPaths';

class EnsureLoggedInContainer extends React.Component {
  static propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    children: React.PropTypes.element,
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string.isRequired,
      search: React.PropTypes.string.isRequired
    }).isRequired,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired
    }).isRequired
  }

  componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      this.props.router.push({
        pathname: nav.LOGIN,
        query: { redirectTo: this.props.location.pathname + this.props.location.search }
      });
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  const { session: { isAuthenticated } } = state;
  return { isAuthenticated };
};

export default connect(mapStateToProps)(EnsureLoggedInContainer);
