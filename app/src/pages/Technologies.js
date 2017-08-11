import React, { Component } from "react";
import { ControlButtons } from "../App";



const TableHeaders = (props) => {
	let heads = []
	props.header.forEach(row => {
		heads.push(<th key={row.head} colSpan={row.colspan}>{row.head}</th>)
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
		rows.push(<td key={row.data} colSpan={row.colspan}>{row.data}</td>)
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
			<div className="clear">
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

		header = <TableHeaders header={[{head: 1, colspan: null}, {head: 2, colspan: null}, {head: 3, colspan: null}, {head: 4, colspan: null}]} />
		body = <TableRow body={[{data: 'how', colspan: null}, {data: 'are', colspan: null}, {data: 'your', colspan: null}, {data: 'blaa', colspan: null}]} />
		
		return (
			<div className="padded-div">
				<ControlButtons />
				<InfoTable theaders={header} tbody={body} />
			</div>
		);
	}
}

export default Technologies;
