import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message, Icon } from "semantic-ui-react";
import { resendToken } from "../../actions/auth";

class ConfirmEmailMessage extends Component {
  state = {
    sending: false,
    success: false
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ sending: true });
    this.props
      .resendToken(this.props.email)
      .then(() => this.setState({ sending: false, success: true }))
      .catch(() => this.setState({ sending: false, success: false }));
  };

  renderMessageContent = () => {
    const { sending, success } = this.state;
    let result;
    if (!sending && !success) {
      result = (
        <a onClick={this.handleClick} href="/">
          Resend token.
        </a>
      );
    } else if (sending && !success) {
      result = (
        <span>
          <Icon name="circle notched" loading /> Sending token...
        </span>
      );
    } else if (!sending && success) {
      result = (
        <span>
          <Icon name="checkmark" /> Token sended.
        </span>
      );
    }
    return result;
  };

  render() {
    return (
      <Message info>
        <Message.Header>
          Please, verify your email to unlock awesomeness.
        </Message.Header>

        <Message.Content>{this.renderMessageContent()}</Message.Content>
      </Message>
    );
  }
}

ConfirmEmailMessage.propTypes = {
  resendToken: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    email: state.user.email
  };
}

export default connect(
  mapStateToProps,
  { resendToken }
)(ConfirmEmailMessage);
