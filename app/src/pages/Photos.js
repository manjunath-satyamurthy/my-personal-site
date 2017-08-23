import React, { Component } from "react";
import { ControlButtons } from "../App";
import { Modal } from "../Components";

class TaggedPhotos extends Component {
	onClick = () => {
		this.props.setModalName(this.props.url);
	};
	render() {
		return (
			<div className="photo-preview" onClick={this.onClick}>
				<img src={this.props.url} alt="Failed to load" />
				<h3>
					<span>
						{this.props.comment}
					</span>
				</h3>
			</div>
		);
	}
}


class PhotoModal extends Component {
	onLeftClick = () => {
		this.props.setModalName(this.props.previousPhoto);
	};

	onRightClick = () => {
		this.props.setModalName(this.props.nextPhoto);
	};

	render() {
		return (
			<div>
				<p className="left-arrow" onClick={this.onLeftClick}>
					&lt;
				</p>
				<img src={this.props.currentPhoto} alt="Failed to Load" />
				<p className="right-arrow" onClick={this.onRightClick}>
					&gt;
				</p>
			</div>
		);
	}
}


class Photos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shouldPageLoad: true,
			images: null,
			showModalName: null
		};
		this.setModalName = this.setModalName.bind(this);
	}

	setModalName = url => {
		this.setState({
			showModalName: url
		});
	};

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
		let imageData = this.state.images;
		let photoModals = [];
		for (let i in imageData) {
			i = parseInt(i, 10);
			let previousPhoto = "",
				nextPhoto = "",
				currentPhoto = "";
			let lastIndex = imageData.length - 1;

			images.push(
				<TaggedPhotos
					url={imageData[i].image_url}
					comment={imageData[i].comment}
					key={imageData[i].image_url}
					setModalName={this.setModalName}
				/>
			);

			currentPhoto = imageData[i].image_url;
			if (i === 0) {
				previousPhoto = imageData[lastIndex].image_url;
			} else {
				previousPhoto = imageData[i - 1].image_url;
			}
			if (i === lastIndex) {
				nextPhoto = imageData[0].image_url;
			} else {
				nextPhoto = imageData[i + 1].image_url;
			}

			let photoModal = (
				<PhotoModal
					currentPhoto={currentPhoto}
					nextPhoto={nextPhoto}
					previousPhoto={previousPhoto}
					setModalName={this.setModalName}
				/>
			);

			photoModals.push(
				<Modal
					className="modal"
					modalContent={photoModal}
					key={currentPhoto}
					name={currentPhoto}
					showModalName={this.state.showModalName}
				/>
			);
		}

		if (!this.shouldPageLoad) {
			return (
				<div className="padded-div">
					<ControlButtons />
					<div>
						{images}
					</div>
					{photoModals}
				</div>
			);
		}
	}
}

export default Photos;
