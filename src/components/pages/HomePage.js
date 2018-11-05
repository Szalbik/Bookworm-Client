import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";

class Homepage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, logout } = this.props;
    return (
      <div>
        <h1>HomePage</h1>
        {isAuthenticated ? (
          <button onClick={() => logout()}>Logout</button>
        ) : (
          <div>
            <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(Homepage);
