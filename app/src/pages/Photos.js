import React, { Component } from "react";
import { ControlButtons } from "../App";
import { Modal } from "../Components";

const TaggedPhotos = props => {
	return (
		<div className="photo-preview">
			<img src={props.url} alt="Failed to load"/>
			<h3><span>{props.comment}</span></h3>
		</div>
	);
};

class Photos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shouldPageLoad: true,
			images: null
		};
	}

	render() {
		if (this.state.shouldPageLoad) {
			fetch("http://localhost:8000/get_photos", {
				method: "GET"
			})
				.then(res => {
					return res.json();
				})
				.then(json => {
					this.setState({
						images: json,
						shouldPageLoad: false
					});
				});
		}

		let images = [];
		let imageData = this.state.images
		for (let i in imageData) {
			images.push(
				<TaggedPhotos
					url={imageData[i].image_url}
					comment={imageData[i].comment}
					key={imageData[i].image_url}
				/>
			);
		}
		let x = (
			<div>
				<p className="left-arrow"></p>
				<img src="http://localhost:8000/media/photos/calvinhobbes.jpg" />
				<p className="right-arrow"></p>
			</div>
		)
		if (!this.shouldPageLoad) {
			return (
				<div className="padded-div">
					<ControlButtons />
					<div>
						{ images }
					</div>
					<Modal className="modal" modalContent={x} />
				</div>
			);
		}
	}
}

export default Photos;
