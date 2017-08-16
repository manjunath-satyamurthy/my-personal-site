import React, { Component } from "react";
import { Route, NavLink, Redirect } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home.js";
import WorkHistory from "./pages/WorkHistory.js";
import Education from "./pages/Education.js";
import Technologies from "./pages/Technologies.js";
import Projects from "./pages/Projects.js";
import Photos from "./pages/Photos.js";
import ContactMe from "./pages/ContactMe.js";
import Credits from "./pages/Credits.js";

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
  // let later = <Navbutton url="/blog" pageName="Blog" />
  return (
    <div className="menu">
      <Navbutton url="/" pageName="Home" />
      <Navbutton url="/technologies" pageName="Technologies" />
      <Navbutton url="/work-history" pageName="Work History" />
      <Navbutton url="/education" pageName="Education" />
      <Navbutton url="/projects" pageName="Projects" />
      <Navbutton url="/resume" pageName="Resume" />
      <Navbutton url="/photos" pageName="Photos" />
      <Navbutton url="/contact-me" pageName="Contact me" />
      <Navbutton url="/credits" pageName="Credits" />
    </div>
  );
};

const Inputs = props => {
  return (
    <div className="input-form">
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
      password: "Qwerty1.",
      isLoggedIn: LocalStorage.isLoggedIn()
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
        } else {
          throw Error(res.statusText);
        }
      })
      .then(json => {
        window.localStorage.setItem("isLoggedIn", true);
        window.localStorage.setItem("username", json.username);
        this.setState({ isLoggedIn: true });
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
    let isLoggedIn = this.state.isLoggedIn;
    if (!isLoggedIn) {
      return (
        <div id="login-form">
          <Inputs
            label="Username : "
            inputType="text"
            inputName="username"
            inputValue={this.state.username}
            onValueChange={this.onValueChange}
          />
          <Inputs
            label="Password : "
            inputType="password"
            inputName="password"
            inputValue={this.state.password}
            onValueChange={this.onValueChange}
          />
          <div className="form-submit-btn">
          <input
            className="themed-btn"
            type="button"
            onClick={this.onClickLogin}
            name="login"
            value="Login"
          />
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

class LocalStorage {
  static isLoggedIn = () => {
    return localStorage.getItem("isLoggedIn")
      ? JSON.parse(localStorage.getItem("isLoggedIn"))
      : false;
  };
  static username = () => {
    return localStorage.getItem("username")
      ? localStorage.getItem("username")
      : null;
  };
  static shouldHomepageLoad = () => {
    return localStorage.getItem("shouldHomepageLoad")
      ? JSON.parse(localStorage.getItem("shouldHomepageLoad"))
      : true;
  };
  static profileImageURL = () => {
    return localStorage.getItem("profileImageURL")
      ? localStorage.getItem("profileImageURL")
      : null;
  };
  static description = () => {
    return localStorage.getItem("description")
      ? localStorage.getItem("description")
      : null;
  };
  static shouldTechnologiesLoad = () => {
    return localStorage.getItem("shouldTechnologiesLoad")
      ? JSON.parse(localStorage.getItem("shouldTechnologiesLoad"))
      : true;
  };
  static technologies = () => {
    return localStorage.technologies
      ? JSON.parse(localStorage.technologies)
      : null;
  };
  static shouldWorkHistoryLoad = () => {
    return localStorage.shouldWorkHistoryLoad
      ? JSON.parse(localStorage.shouldWorkHistoryLoad)
      : true;
  };
  static workHistory = () => {
    return localStorage.workHistory
      ? JSON.parse(localStorage.workHistory)
      : null;
  };
  static education = () => {
    return localStorage.education
      ? JSON.parse(localStorage.education)
      : null;
  };
  static shouldEducationLoad = () => {
    return localStorage.shouldEducationLoad
      ? JSON.parse(localStorage.shouldEducationLoad)
      : true;
  };

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
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/photos" component={Photos} />
        <Route exact path="/contact-me" component={ContactMe} />
        <Route exact path="/credits" component={Credits} />
      </div>
    );
  }
}

class ControlButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: LocalStorage.isLoggedIn()
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(e) {
    fetch("http://localhost:8000/logout", {
      credentials: "include"
    }).then(res => {
      if (res.ok) {
        localStorage.clear();
        this.setState({
          isLoggedIn: LocalStorage.isLoggedIn()
        });
      }
    });
  }

  render() {
    let edit = null;
    let save = null;
    let logout = null;

    if (this.state.isLoggedIn) {
      logout = (
        <input
          className="themed-btn right-float"
          id="logout-btn"
          type="button"
          value="Logout"
          onClick={this.onLogoutClick}
        />
      );
      if (!this.props.isEdited) {
        edit = (
          <input
            className="themed-btn right-float"
            id="edit-btn"
            type="button"
            value="Edit"
            onClick={this.props.onEditClick}
          />
        );
      }
      if (this.props.isEdited) {
        save = (
          <input
            className="themed-btn right-float"
            id="save-btn"
            type="button"
            value="Save"
            onClick={this.props.onSaveClick}
          />
        );
      }
    }
    return (
      <div className="control-buttons">
        {logout} {edit} {save}
        <br/>
      </div>
    );
  }
}

class App extends Component {
  componentWillMount () {
    console.log("Page Reloading, Clearing LocalStorage")
    localStorage.clear()
  }
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
export { LocalStorage };
export { ControlButtons };
