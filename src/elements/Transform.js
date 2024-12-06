import React, { uuseEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function InputAnchor(props) {
	const { number } = props;
	// state = { buttonShowing: false, justCreated: true, value: this.props.number };
	const [buttonShowing, setButtonShowing] = useState(false);
	const [justCreated, setJustCreated] = useState(true);
	const [value, setValue] = useState(number);

	const mounted = useRef(true);

	const onClick = () => this.setState({ ...this.state, buttonShowing: true });
	const onLeave = () => this.setState({ ...this.state, buttonShowing: false });

	const onDocumentMouseDown = (e) => {
		if (!this.textBox.contains(e.target)) {
			this.setState({ ...this.state, buttonShowing: false });
		}
	};

	const onDocumentKeyDown = (e) => {
		if (e.key === "Escape" || e.keyCode === 27) {
			this.setState({ ...this.state, buttonShowing: false });
		}
	};

	const onDeleteButtonClick = (event) => {
		if (event.button === 0) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onDeleteButtonClick();
		}
	};

	const onLabelClick = (event) => {
		if (event.button === 0) {
			event.preventDefault();
			// event.stopPropagation();
			this.props.onLabelClick();
		}
	};

	const handlerClassName = this.props.handlerClassName;
	const textAnchorStyle = {
		left: this.props.x + "px",
		top: this.props.y + "px",
	};
	const className =
		"text-anchor" +
		(this.state.buttonShowing ? " button-showing " : "") +
		(this.state.justCreated ? " just-created" : "");

	const deleteClassName = this.state.buttonShowing
		? " delete-button-2 "
		: "delete-hide";

	return (
		<Container className={className} style={textAnchorStyle}>
			<Mini className={"text-box"} ref={(e) => (this.textBox = e)}>
				<Button
					className={"measurement-number-type" + handlerClassName}
					ref={(e) => (this.text = e)}
					onMouseDown={this.props.onInputClick}
					onMouseEnter={this.props.onInputClick}
					onMouseLeave={this.props.onInputBlur}
					onBlur={this.props.onInputBlur}
				>
					<input
						className={"measurement-input" + handlerClassName}
						ref={(e) => (this.text = e)}
						type="text"
						value={this.state.value}
						onChange={this.handleChange}
					/>
					<div
						className={"type" + handlerClassName}
						ref={(e) => (this.text = e)}
						onClick={this.onLabelClick}
					>
						{this.props.label ? "M" : "D"}
					</div>
					<div
						className={deleteClassName}
						onClick={onDeleteButtonClick}
						// Additional mouse-down handler means delete works cleanly if text is being edited:
						onMouseDown={this.onDeleteButtonClick}
						ref={(e) => (this.deleteButton = e)}
					>
						<svg className="delete-button-svg-2">
							<path
								className="delete-button-icon-2"
								d="M 4 4 L 11 11 M 11 4 L 4 11"
							/>
						</svg>
					</div>
				</Button>
			</Mini>
		</Container>
	);
}

const Container = styled.div`
	position: absolute;
	width: 100px;
	height: 50px;
`;

const Mini = styled.div`
	width: 100%;
	height: 100%;
`;

const Button = styled.div`
	width: 100%;
	height: 100%;
`;
