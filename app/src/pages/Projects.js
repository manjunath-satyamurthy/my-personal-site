import React, { Component } from "react";
import { LocalStorage } from "../App";
import { TableHeaders, TableRow, InfoTable } from "../Components";

class Projects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shouldPageLoad: LocalStorage.shouldProjectLoad(),
			project: LocalStorage.project()
		};
	}
	render() {
		if (this.state.shouldPageLoad) {
			fetch("http://localhost:8000/get_projects/", {
				method: "GET"
			})
				.then(res => {
					if (res.ok) {
						return res.json();
					}
				})
				.then(json => {
					localStorage.project = json;
					localStorage.shouldProjectLoad = false;
					this.setState({
						project: LocalStorage.project(),
						shouldPageLoad: LocalStorage.shouldProjectLoad()
					});
				});
		}

		let body = [];
		let header = (
			<TableHeaders
				header={[{ head: "Projects", colspan: 2 }]}
				className="main-table-header"
			/>
		);
		let project = this.state.project;
		for (let i in project) {
			let projectLink = (
				<a target="_blank" rel="noopener noreferrer" href={project[i].github_link}>
					{project[i].name}
				</a>
			);

			body.push(
				<TableHeaders
					header={[{ head: projectLink, colspan: 2 }]}
					key={project[i].name}
				/>
			);
			body.push(
				<TableRow
					body={[
						{ data: "description", colspan: 1 },
						{ data: project[i].description, colspan: 1 }
					]}
					key={project[i].description}
				/>
			);
		}

		if (!this.state.shouldPageLoad) {
			return (
				<div className="padded-div">
					<InfoTable theaders={header} tbody={body} />
				</div>
			);
		} else {
			return <p>Loading ...</p>;
		}
	}
}

export default Projects;
