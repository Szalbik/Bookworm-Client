import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import { resetPasswordRequest } from "../../actions/auth";

class ForgotPasswordPage extends Component {
  state = {
    success: false
  };

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    const { success } = this.state;
    return success ? (
      <Message positive>Email was sended</Message>
    ) : (
      <ForgotPasswordForm submit={this.submit} />
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(
  null,
  { resetPasswordRequest }
)(ForgotPasswordPage);
