import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Message } from "semantic-ui-react";
import _ from "lodash";
import InlineError from "../messages/InlineError";

class ResetPasswordForm extends Component {
  state = {
    data: {
      token: this.props.token,
      password: "",
      password_confirmation: ""
    },
    loading: false,
    errors: {}
  };

  handleChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: _.omit(this.state.errors, e.target.name)
    });
  };

  validate = values => {
    const errors = {};
    if (!values.password || values.password.length < 6)
      errors.password = "Password should have at least 6 characters!";
    if (
      !values.password_confirmation ||
      values.password_confirmation.length < 6
    )
      errors.password_confirmation =
        "Password should have at least 6 characters!";
    if (values.password !== values.password_confirmation)
      errors.password_confirmation = "Passwodrs do not match!";
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (_.isEmpty(errors)) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  render() {
    const { errors, data, loading } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.password}>
          <label>Password</label>
          <input
            onChange={this.handleChange}
            name="password"
            placeholder="password"
            value={data.password}
            type="password"
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field error={!!errors.password_confirmation}>
          <label>Password confirmation</label>
          <input
            onChange={this.handleChange}
            name="password_confirmation"
            placeholder="password confirmation"
            value={data.password_confirmation}
            type="password"
          />
          {errors.password_confirmation && (
            <InlineError text={errors.password_confirmation} />
          )}
        </Form.Field>
        <Button type="submit">Change</Button>
      </Form>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
