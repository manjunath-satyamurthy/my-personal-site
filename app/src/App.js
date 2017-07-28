import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import './App.css';
import Home from './pages/Home.js';
import WorkHistory from './pages/WorkHistory.js';
import Education from './pages/Education.js';
import Technologies from './pages/Technologies.js';


class Navbutton extends Component {
  render() {
    return (
      <Link 
        to={this.props.url}
        className={(this.props.activePage === this.props.url) ? 'active' : 'inactive'}
        name={this.props.url}
        onClick={this.props.onClick}>
          { this.props.pageName }
      </Link>
    )
  }
}


class Sidebar extends Component {

  constructor(props) {
    super(props)
    this.handleNavClick = this.handleNavClick.bind(this);
    this.state = {
      activePage: '/'
    }
  }

  handleNavClick (e) {
    this.setState({
      activePage: e.currentTarget.name
    });
  }

  render() {
    return (
      <div className="menu">
        <Navbutton url="/" pageName="Home" activePage={this.state.activePage} onClick={this.handleNavClick}/>
        <Navbutton url="/technologies" pageName="Technologies" activePage={this.state.activePage} onClick={this.handleNavClick}/>
        <Navbutton url="/work-history" pageName="Work History" activePage={this.state.activePage} onClick={this.handleNavClick}/>
        <Navbutton url="/education" pageName="Education" activePage={this.state.activePage} onClick={this.handleNavClick}/>
        <Navbutton url="/projects" pageName="Projects" activePage={this.state.activePage} onClick={this.handleNavClick}/>
        <Navbutton url="/resume" pageName="Resume" activePage={this.state.activePage} onClick={this.handleNavClick}/>
        <Navbutton url="/photos" pageName="Photos" activePage={this.state.activePage} onClick={this.handleNavClick}/>
        <Navbutton url="/blog" pageName="Blog" activePage={this.state.activePage} onClick={this.handleNavClick}/>
        <Navbutton url="/contact-me" pageName="Contact me" activePage={this.state.activePage} onClick={this.handleNavClick}/>
        <Navbutton url="/credits" pageName="Credits" activePage={this.state.activePage} onClick={this.handleNavClick}/>
      </div> 
    );
  }
}


class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/technologies" component={Technologies}/>
        <Route path="/work-history" component={WorkHistory}/>
        <Route path="/education" component={Education}/>
      </div>
      )
  }
}


class App extends Component {
  render () {
    return (
      <div>
        <Sidebar />
        <Main />
      </div>
    )
  }
}

export default App