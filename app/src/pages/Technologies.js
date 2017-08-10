import React, { Component } from "react";
import { ControlButtons } from "../App";



const TableHeaders = (props) => {
	let heads = []
	props.header.forEach(head => {
		heads.push(<th key={head}>{head}</th>)
	})
	return (
		<tr>
			{heads}
		</tr>
	)
}

const TableRow = (props) => {
	let rows = [];
	props.body.forEach(row => {
		rows.push(<td key={row}>{row}</td>)
	}) 
	return (
		<tr>
			{rows}
		</tr>
	)
}

class InfoTable extends Component {
	render() {
		return (
			<div>
				<table className="info-table">
					<thead>{this.props.theaders}</thead>
					<tbody>{this.props.tbody}</tbody>
				</table>
			</div>
		);
	}
}

class Technologies extends Component {
	render() {
		let header;
		let body;

		header = <TableHeaders header={[1, 2, 3, 4]} />
		body = <TableRow body={['how', 'are', 'your', 'blaa']} />
		return (
			<div className="padded-div">
				<ControlButtons />
				<InfoTable theaders={header} tbody={body}/>
				<p> I am fine </p>
			</div>
		);
	}
}

export default Technologies;
