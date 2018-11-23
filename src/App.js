import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import DashboardPage from "./components/pages/DashboardPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import NewBookPage from "./components/pages/NewBookPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import TopNavigation from "./components/navigation/TopNavigation";

class App extends Component {
  render() {
    return (
      <div className="ui container">
        {this.props.isAuthenticated && <TopNavigation />}
        <Route path="/" exact component={HomePage} />
        <Route path="/confirmation/:token" component={ConfirmationPage} />
        <GuestRoute path="/login" component={LoginPage} />
        <GuestRoute path="/signup" component={SignupPage} />
        <GuestRoute path="/forgot_password" component={ForgotPasswordPage} />
        <GuestRoute
          path="/reset_password/:token"
          component={ResetPasswordPage}
        />
        <UserRoute path="/dashboard" component={DashboardPage} />
        <UserRoute path="/books/new" component={NewBookPage} />
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default withRouter(connect(mapStateToProps)(App));
