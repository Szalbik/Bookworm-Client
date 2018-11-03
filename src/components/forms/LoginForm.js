import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class LoginForm extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  handleChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: null }
    });
  };

  validate = values => {
    const errors = {};
    if (!Validator.isEmail(values.email)) errors.email = "Invalid email!";
    if (!values.password || values.password.length < 6)
      errors.password = "Password can't be blank!";
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(this.state.errors).length === 0) {
      this.props.submit(this.state.data);
    }
  };

  render() {
    const { errors, data, loading } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} noValidate>
        <Form.Field error={!!errors.email}>
          <label>Email</label>
          <input
            onChange={this.handleChange}
            name="email"
            placeholder="email"
            type="email"
            value={data.email}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label>Password</label>
          <input
            onChange={this.handleChange}
            name="password"
            placeholder="password"
            type="password"
            value={data.password}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button type="submit">Login</Button>
      </Form>
    );
  }
}

export default LoginForm;
