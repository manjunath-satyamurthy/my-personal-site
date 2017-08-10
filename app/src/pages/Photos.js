import React, { Component } from "react";
import { ControlButtons } from "../App";

class Photos extends Component {
	render() {
		return (
			<div className="padded-div">
				<ControlButtons />
				<p> Image 1, 2, 3 </p>
			</div>
		);
	}
}

export default Photos;
