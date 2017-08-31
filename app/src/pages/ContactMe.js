import React, { Component } from "react";
import { TableHeaders, TableRow, InfoTable } from "../Components";


class ContactMe extends Component {
  render() {
  	let header = <TableHeaders header={[{"head": "Contact", "colspan":"2"}]} className="main-table-header"/>;
  	let body = []
  	body.push(
  		<TableRow body={[{"data": "Email", "colSpan": "1"}, {"data": "pass2rahul@gmail.com", "colSpan": "1"}]} key="email" />,
  		<TableRow body={[{"data": "Phone No.", "colSpan": "1"}, {"data": "+49-176-5899-7500", "colSpan": "1"}]} key="phone" />

  	)

    return (
    	<div className="padded-div">
    		<InfoTable theaders={header} tbody={body} />
    	</div>
    )
  }
}

export default ContactMe