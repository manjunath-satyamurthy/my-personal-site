import React, { Component } from "react";


const TableHeaders = props => {
	let heads = [];
	props.header.forEach(row => {
		heads.push(
			<th key={row.head} colSpan={row.colspan} className={props.className}>
				{row.head}
			</th>
		);
	});
	return (
		<tr>
			{heads}
		</tr>
	);
};

const TableRow = props => {
	let rows = [];
	props.body.forEach(row => {
		rows.push(
			<td key={row.data} colSpan={row.colspan}>
				{row.data}
			</td>
		);
	});
	return (
		<tr>
			{rows}
		</tr>
	);
};

const InfoTable = props => {
	return (
		<div className="clear">
			<table className="info-table">
				<thead>
					{props.theaders}
				</thead>
				<tbody>
					{props.tbody}
				</tbody>
			</table>
		</div>
	);
}

class Modal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: this.props.name === this.props.showModalName,
		}
		this.closeButtonClicked = this.closeButtonClicked.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if (this.props.name === nextProps.showModalName){
			this.setState({
				showModal: true,
			})
		} else {
			this.setState({
				showModal: false,
			})
		}
	}

	closeButtonClicked = e => {
		this.setState({
			showModal: false
		})
	}

	render() {
		if (this.state.showModal){
			return (
				<div id={this.props.id} className={this.props.className}>
				  <span className="close" onClick={this.closeButtonClicked}>&times;</span>
				  <div className="modal-content">
					  {this.props.modalContent}
				  </div>
				</div>
			)
		} else {
			return null;
		}
	}
}

export { TableHeaders };
export { TableRow };
export { InfoTable };
export { Modal };