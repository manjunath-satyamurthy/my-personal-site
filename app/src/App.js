import React, { Component } from "react";
import { Route, NavLink, Redirect } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home.js";
import WorkHistory from "./pages/WorkHistory.js";
import Education from "./pages/Education.js";
import Technologies from "./pages/Technologies.js";

const Navbutton = props => {
  return (
    <NavLink
      exact
      activeClassName="active"
      to={props.url}
      name={props.url}
      onClick={props.onClick}
    >
      {props.pageName}
    </NavLink>
  );
};

const Sidebar = props => {
  return (
    <div className="menu">
      <Navbutton url="/" pageName="Home" />
      <Navbutton url="/technologies" pageName="Technologies" />
      <Navbutton url="/work-history" pageName="Work History" />
      <Navbutton url="/education" pageName="Education" />
      <Navbutton url="/projects" pageName="Projects" />
      <Navbutton url="/resume" pageName="Resume" />
      <Navbutton url="/photos" pageName="Photos" />
      <Navbutton url="/blog" pageName="Blog" />
      <Navbutton url="/contact-me" pageName="Contact me" />
      <Navbutton url="/credits" pageName="Credits" />
    </div>
  );
};

const Inputs = props => {
  return (
    <div>
      <p>
        {props.label}
      </p>
      <input
        type={props.inputType}
        name={props.inputName}
        defaultValue={props.inputValue}
        onChange={props.onValueChange}
      />
    </div>
  );
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      username: "manju",
      password: "password",
      loginSuccessful: false
    };
  }

  onClickLogin(e) {
    let data = new FormData();
    data.append(
      "data",
      JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    );

    fetch("http://localhost:8000/login/", {
      method: "post",
      credentials: "include",
      body: data,
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(json => {
        this.setState({
          loginSuccessful: true
        });
        console.log(json);
      })
      .catch(err => {
        console.log(err);
      });
  }

  onValueChange(e) {
    let inputName = e.currentTarget.name;
    let inputValue = e.currentTarget.value;
    this.setState({
      [inputName]: inputValue
    });
  }

  render() {
    let isLoggedIn = this.state.loginSuccessful;

    if (!isLoggedIn) {
      return (
        <div>
          <Inputs
            label="Username"
            inputType="text"
            inputName="username"
            inputValue={this.state.username}
            onValueChange={this.onValueChange}
          />
          <Inputs
            label="Password"
            inputType="password"
            inputName="password"
            inputValue={this.state.password}
            onValueChange={this.onValueChange}
          />
          <input
            type="button"
            onClick={this.onClickLogin}
            name="login"
            value="Login"
          />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/technologies" component={Technologies} />
        <Route exact path="/work-history" component={WorkHistory} />
        <Route exact path="/education" component={Education} />
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Main />
      </div>
    );
  }
}

export default App;
