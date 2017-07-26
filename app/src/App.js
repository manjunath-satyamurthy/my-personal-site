import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home.js';
import WorkHistory from './pages/WorkHistory.js';
import Education from './pages/Education.js';
import Technologies from './pages/Technologies.js';


class Navbutton extends Component {
  render() {
    return (
      <a href={this.props.url}
      className={(this.props.activePage === this.props.url) ? 'active' : 'inactive'}
      name={this.props.url} >
        { this.props.pageName }
      </a>
    )
  }
}


class Sidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activePage: '/'
    }
  }

  componentDidMount () {
    let urlParts = window.location.href.split('/')

    this.setState({
      activePage: '/'+urlParts[urlParts.length-1]
    })
  }

  render() {
    return (
      <div className="menu">
        <Navbutton url="/" pageName="Home" activePage={this.state.activePage} />
        <Navbutton url="/technologies" pageName="Technologies" activePage={this.state.activePage} />
        <Navbutton url="/work-history" pageName="Work History" activePage={this.state.activePage} />
        <Navbutton url="/education" pageName="Education" activePage={this.state.activePage} />
        <Navbutton url="/projects" pageName="Projects" activePage={this.state.activePage} />
        <Navbutton url="/resume" pageName="Resume" activePage={this.state.activePage} />
        <Navbutton url="/photos" pageName="Photos" activePage={this.state.activePage} />
        <Navbutton url="/blog" pageName="Blog" activePage={this.state.activePage} />
        <Navbutton url="/contact-me" pageName="Contact me" activePage={this.state.activePage} />
        <Navbutton url="/credits" pageName="Credits" activePage={this.state.activePage} />
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