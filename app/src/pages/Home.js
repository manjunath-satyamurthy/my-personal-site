import React, { Component } from 'react';




class ProfilePhoto extends Component {
  render () {
    return (
      <img alt="" src={this.props.profileImgURL} id={this.props.photoType}/>
    )
  }
}


class MainHeading extends Component {
  render () {
    return (
      <h1 
      className={this.props.headingType} 
      id={this.props.id ? this.props.id : ""} >
        {this.props.content}
      </h1>
    )
  }
}


class TextDescription extends Component {
	render () {
  	return (
  		<p className={this.props.descriptionType}>{this.props.text}</p>
  		)
	}
}


class ProfileLinks extends Component {
  render () {
    return (
      <table className="profile-links">
        <tbody>
          <tr>
            <td><a target="_blank" rel="noopener noreferrer" href="https://github.com/manjunath-satyamurthy"><img alt="" width="40" src="/media/github.png" /></a></td>
            <td><a target="_blank" rel="noopener noreferrer" href="https://stackoverflow.com/users/3536784/manjunath-satyamurthy"><img alt="" width="40" src="/media/stackoverflow.svg" /></a></td>
            <td><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/manjunathsatyamurthy"><img alt="" width="40" src="/media/facebook.png" /></a></td>
            <td><a target="_blank" rel="noopener noreferrer" href="https://plus.google.com/+ManjunathSatyamurthy"><img alt="" width="40" src="/media/google-plus.gif" /></a></td>
            <td><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/manjunath-satyamurthy-a4408575/"><img alt="" width="40" src="/media/linked-in.png" /></a></td>
            <td><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/ManjunathSatya"><img alt="" width="40" src="/media/twitter.png" /></a></td>
          </tr>
        </tbody>
      </table>
    )
  }
}



class Home extends Component {
  constructor (props) {
    super(props)
    this.headingText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  }
  render() {
    return (
      <div className="padded-div">
        <ProfilePhoto profileImgURL="/media/profile.jpg" photoType="profile-photo" />
        <MainHeading headingType="center" id="manjunath-satyamurthy" content="Manjunath Satyamurthy" />
        <TextDescription descriptionType="welcome-text" text={this.headingText} />
        <ProfileLinks />
      </div>

    )
  }

}

export default Home