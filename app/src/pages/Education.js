import React, { Component } from "react";
import { LocalStorage, ControlButtons } from "../App";
import { TableHeaders, TableRow, InfoTable } from "../Components";

class Education extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shouldPageLoad: LocalStorage.shouldEducationLoad(),
			education: LocalStorage.education()
		};
	}
	render() {
		if (this.state.shouldPageLoad) {
			fetch("http://localhost:8000/get_education/", {
				method: "GET"
			})
				.then(res => {
					if (res.ok) {
						return res.json();
					}
				})
				.then(json => {
					localStorage.education = json;
					localStorage.shouldEducationLoad = false;
					this.setState({
						education: LocalStorage.education(),
						shouldPageLoad: LocalStorage.shouldEducationLoad()
					});
				});
		}

		let body = [];
		let header = (
			<TableHeaders
				header={[{ head: "Education", colspan: 2 }]}
				className="main-table-header"
			/>
		);
		let education = this.state.education;

		for (let i in education) {
			body.push(
				<TableHeaders
					header={[{ head: education[i].school_name, colspan: 2 }]}
					key={education[i].school_name}
				/>
			);
			body.push(
				<TableRow
					body={[
						{ data: "Duration", colspan: 1 },
						{ data: education[i].duration, colspan: 1 }
					]}
					key={education[i].duration}
				/>
			);
			body.push(
				<TableRow
					body={[
						{ data: "Location", colspan: 1 },
						{ data: education[i].location, colspan: 1 }
					]}
					key={education[i].location}
				/>
			);
			body.push(
				<TableRow
					body={[
						{ data: "Stream", colspan: 1 },
						{ data: education[i].stream, colspan: 1 }
					]}
					key={education[i].stream}
				/>
			);
			body.push(
				<TableRow
					body={[
						{ data: "Description", colspan: 1 },
						{ data: education[i].description, colspan: 1 }
					]}
					key={education[i].description}
				/>
			);
		}

		if (!this.state.shouldPageLoad) {
			return (
				<div className="padded-div">
					<ControlButtons />
					<InfoTable theaders={header} tbody={body} />
				</div>
			);
		} else {
			return <p>Loading ...</p>;
		}
	}
}

export default Education