import React, { Component } from "react";
import { Route } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" component={LoginPage} />
        <Route path="/" exact component={HomePage} />
      </div>
    );
  }
}

export default App;
