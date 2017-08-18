import React from "react";


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

const Modal = props => {
	return (
		<div id={props.id} className={props.className}>
		  <span className="close">&times;</span>
		  <div className="modal-content">
			  {props.modalContent}
		  </div>
		</div>
	)
}

export { TableHeaders };
export { TableRow };
export { InfoTable };
export { Modal };