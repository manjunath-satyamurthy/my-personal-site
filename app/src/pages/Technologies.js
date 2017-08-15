import React, { Component } from "react";
import { LocalStorage, ControlButtons } from "../App";



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

	constructor(props){
		super(props)
		this.state = {
			shouldPageLoad: LocalStorage.shouldTechnologiesLoad(),
		}
	}

	render() {
		let header;
		let body = [];

		if (this.state.shouldPageLoad){
      fetch("http://localhost:8000/get_technologies/", {
        method: "GET"
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(json => {
          console.log(JSON.parse(json))
          localStorage.technologies = json;
          localStorage.shouldTechnologiesLoad = false;
          this.setState({
            technologies: LocalStorage.technologies(),
            shouldPageLoad: LocalStorage.shouldTechnologiesLoad()
          });
        });
		}

		// header = 
		// body = <TableRow body={[{data: category, colspan: 2}]} key={category} />
		let technologies = this.state.technologies
		for (let category in technologies){
			body.push(<TableHeaders header={[{head: category, colspan: 2}]} key={category} />)
			for (let expertise in technologies[category]){
				let particulars = technologies[category][expertise].join(", ") 
				body.push(
					<TableRow 
					body={[{data: expertise, colspan: 1}, {data: particulars, colspan: 1}]} 
					key={particulars} />
				)
			}
		}

		if (!this.state.shouldPageLoad){
			return (
				<div className="padded-div">
					<ControlButtons />
					<InfoTable theaders={header} tbody={body} />
				</div>
			);
		} else {
			return <p>Loading ...</p>
		}

	}
}

export default Technologies;
