import React, { Component } from "react";
import { LocalStorage, ControlButtons } from "../App";

class Resume extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: LocalStorage.isLoggedIn(),
			shouldPageLoad: true,
			isEdited: false,
			uploadFile: null,
			resumeURL: null
		};
		this.onEditClick = this.onEditClick.bind(this);
		this.onSaveClick = this.onSaveClick.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onEditClick = e => {
		this.setState({
			isEdited: !this.state.isEdited
		});
	};
	onSaveClick = e => {
		if (this.state.uploadFile) {
			let data = new FormData();
			data.append("resume", this.state.uploadFile);
			fetch("http://localhost:8000/update_resume/", {
				method: "POST",
				credentials: "include",
				body: data,
				headers: {
					Accept: "multipart/form-data"
				}
			}).then(res => {
				if (res.ok) {
					this.setState({
						isEdited: !this.state.isEdited,
						uploadFile: null,
						shouldPageLoad: true
					});
				}
			});
		}
	};
	onChange = e => {
		this.setState({
			uploadFile: e.currentTarget["files"][0]
		});
	};
	render() {
		let resumePDF = !this.state.isEdited
			? <object
					data={this.state.resumeURL}
					type="application/pdf"
					height="100%"
					width="100%"
				>
					Alternative Text
				</object>
			: null;
		let uploadResume = null;
		if (this.state.isLoggedIn & this.state.isEdited) {
			uploadResume = (
				<div className="editable-photo">
					<input
						type="file"
						className="themed-btn"
						id="upload-btn"
						onChange={this.onChange}
					/>
				</div>
			);
		}

		if (this.state.shouldPageLoad) {
			fetch("http://localhost:8000/get_resume/", {
				method: "GET",
				credentials: "include"
			})
				.then(res => {
					if (res.ok) {
						return res.json();
					}
				})
				.then(json => {
					this.setState({
						resumeURL: json.url,
						shouldPageLoad: false
					});
				});
		}

		if (this.state.resumeURL) {
			return (
				<div className="padded-div">
					<ControlButtons
						isLoggedIn={this.state.isLoggedIn}
						isEdited={this.state.isEdited}
						onEditClick={this.onEditClick}
						onSaveClick={this.onSaveClick}
					/>
					{resumePDF}
					{uploadResume}
				</div>
			);
		} else {
			return <p>Loading ...</p>;
		}
	}
}

export default Resume;
