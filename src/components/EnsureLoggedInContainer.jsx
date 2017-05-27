import React from 'react';
import { connect } from 'react-redux';
import * as nav from '../constants/navPaths';

class EnsureLoggedInContainer extends React.Component {
  static propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired,
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
    if (!this.props.isLoggedIn) {
      this.props.router.push({
        pathname: nav.LOGIN,
        query: { redirectTo: this.props.location.pathname + this.props.location.search }
      });
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  const { session: { isLoggedIn } } = state;
  return { isLoggedIn };
};

export default connect(mapStateToProps)(EnsureLoggedInContainer);
