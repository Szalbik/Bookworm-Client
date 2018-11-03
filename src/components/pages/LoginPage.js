import React, { Component } from "react";
import LoginForm from "../forms/LoginForm";

class LoginPage extends Component {
  state = {};

  handleSubmit = data => {
    console.log(data)
  }

  render() {
    return (
      <div>
        <h1>LoginPage</h1>
        <LoginForm submit={this.handleSubmit} />
      </div>
    );
  }
}

export default LoginPage;
