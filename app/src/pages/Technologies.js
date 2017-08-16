import React, { Component } from "react";
import { LocalStorage, ControlButtons } from "../App";
import { TableHeaders, TableRow, InfoTable } from "../Components";

class Technologies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shouldPageLoad: LocalStorage.shouldTechnologiesLoad(),
			technologies: LocalStorage.technologies()
		};
	}

	render() {
		let header = (
			<TableHeaders
				header={[{ head: "Technologies", colspan: 2 }]}
				className="main-table-header"
			/>
		);
		let body = [];

		if (this.state.shouldPageLoad) {
			fetch("http://localhost:8000/get_technologies/", {
				method: "GET"
			})
				.then(res => {
					if (res.ok) {
						return res.json();
					}
				})
				.then(json => {
					localStorage.technologies = json;
					localStorage.shouldTechnologiesLoad = false;
					this.setState({
						technologies: LocalStorage.technologies(),
						shouldPageLoad: LocalStorage.shouldTechnologiesLoad()
					});
				});
		}

		let technologies = this.state.technologies;
		for (let category in technologies) {
			body.push(
				<TableHeaders
					header={[{ head: category, colspan: 2 }]}
					key={category}
				/>
			);
			for (let expertise in technologies[category]) {
				let particulars = technologies[category][expertise].join(", ");
				body.push(
					<TableRow
						body={[
							{ data: expertise, colspan: 1 },
							{ data: particulars, colspan: 1 }
						]}
						key={particulars}
					/>
				);
			}
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

export default Technologies;
