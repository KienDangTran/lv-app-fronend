import React from "react";
import Header from "./common/Header";

window.$ = window.jQuery = require("jquery");

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header/>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element
};

export default App;
