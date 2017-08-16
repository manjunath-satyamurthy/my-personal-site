import React, { Component } from "react";
import { LocalStorage, ControlButtons } from "../App";
import { TableHeaders, TableRow, InfoTable } from "../Components";

class WorkHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shouldPageLoad: LocalStorage.shouldWorkHistoryLoad(),
			workHistory: LocalStorage.workHistory()
		};
	}
	render() {
		if (this.state.shouldPageLoad) {
			fetch("http://localhost:8000/get_work_history/", {
				method: "GET"
			})
				.then(res => {
					if (res.ok) {
						return res.json();
					}
				})
				.then(json => {
					localStorage.workHistory = json;
					localStorage.shouldWorkHistoryLoad = false;
					this.setState({
						workHistory: LocalStorage.workHistory(),
						shouldPageLoad: LocalStorage.shouldWorkHistoryLoad()
					});
				});
		}

		let body = [];
		let header = (
			<TableHeaders
				header={[{ head: "Work History", colspan: 2 }]}
				className="main-table-header"
			/>
		);
		let workHistory = this.state.workHistory;

		for (let i in workHistory) {
			body.push(
				<TableHeaders
					header={[{ head: workHistory[i].Company, colspan: 2 }]}
					key={workHistory[i].Company}
				/>
			);
			body.push(
				<TableRow
					body={[
						{ data: "Role", colspan: 1 },
						{ data: workHistory[i].Role, colspan: 1 }
					]}
					key={workHistory[i].Role}
				/>
			);
			body.push(
				<TableRow
					body={[
						{ data: "Duration", colspan: 1 },
						{ data: workHistory[i].Duration, colspan: 1 }
					]}
					key={workHistory[i].Duration}
				/>
			);
			body.push(
				<TableRow
					body={[
						{ data: "Description", colspan: 1 },
						{ data: workHistory[i].Description, colspan: 1 }
					]}
					key={workHistory[i].Description}
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

export default WorkHistory;
