import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import _ from "lodash";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends Component {
  state = {
    data: {
      email: ""
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
    if (!Validator.isEmail(values.email)) errors.email = "Invalid email!";
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
        <Form.Field error={!!errors.email}>
          <label>Email</label>
          <input
            onChange={this.handleChange}
            name="email"
            placeholder="email"
            value={data.email}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Button type="submit">Send</Button>
      </Form>
    );
  }
}

export default ForgotPasswordForm;
