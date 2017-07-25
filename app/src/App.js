import React, { Component } from 'react';
import './App.css';


function Navbutton(props){
  if (props.active) {
    return <a href={props.url} className="active">{ props.pagename }</a>
  }
  return <a href={props.url}>{ props.pagename }</a>
}


class Sidebar extends Component {
  render() {
    return (
      <div className="menu">
        <Navbutton url="/home" pagename="Home" active={true}/>
        <Navbutton url="/technologies" pagename="Technologies" />
        <Navbutton url="/work-history" pagename="Work History" />
        <Navbutton url="/education" pagename="Education" />
        <Navbutton url="/projects" pagename="Projects" />
        <Navbutton url="/resume" pagename="Resume" />
        <Navbutton url="/blog" pagename="Blog" />
        <Navbutton url="/contact-me" pagename="Contact me" />
        <Navbutton url="/photos" pagename="Photos" />
        <Navbutton url="/credits" pagename="Credits" />
      </div> 
    );
  }
}


class App extends Component {
  render () {
    return (
      <div>
        <Sidebar />
        hello how are you ?
      </div>
    )
  }
}

export default App