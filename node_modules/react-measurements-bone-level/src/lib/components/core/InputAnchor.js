import React, { PureComponent } from "react";

export default class InputAnchor extends PureComponent {
	state = { buttonShowing: false, justCreated: true, value: this.props.number };

	componentDidMount() {
		this.mounted = true;
		this.textBox.addEventListener("mouseover", this.onClick);
		this.textBox.addEventListener("mouseleave", this.onLeave);
		document.addEventListener("mousedown", this.onDocumentMouseDown);
		document.addEventListener("keydown", this.onDocumentKeyDown);
		this.handleChange = this.handleChange.bind(this);

		setTimeout(() => {
			if (this.mounted) {
				this.setState({ ...this.state, justCreated: false });
			}
		}, 200);
	}

	componentWillUnmount() {
		this.mounted = false;
		this.textBox.removeEventListener("mouseover", this.onClick);
		this.textBox.removeEventListener("mouseleave", this.onLeave);
		document.removeEventListener("mousedown", this.onDocumentMouseDown);
		document.removeEventListener("keydown", this.onDocumentKeyDown);
	}

	handleChange(event) {
		if (event.target.value.length + 1 > 3 || isNaN(event.target.value)) {
			return;
		}
		this.setState({ ...this.state, value: event.target.value });
		this.onNumberChange(Number(event.target.value));
	}

	render() {
		const handlerClassName =
			this.props.handlerClassName + (this.props.active ? " selected" : "");
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
		const labelColor = this.props.label ? " mesial" : "";
		return (
			<div className={className} style={textAnchorStyle}>
				<div className={"text-box"} ref={(e) => (this.textBox = e)}>
					<button
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
							disabled={!this.props.enableInput}
						/>
						<div
							className={"type" + labelColor}
							ref={(e) => (this.text = e)}
							onClick={this.onLabelClick}
						>
							{this.props.label ? "M" : "D"}
						</div>
						<div
							className={deleteClassName}
							onClick={this.onDeleteButtonClick}
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
					</button>
				</div>
			</div>
		);
	}

	onClick = () => this.setState({ ...this.state, buttonShowing: true });
	onLeave = () => this.setState({ ...this.state, buttonShowing: false });

	onDocumentMouseDown = (e) => {
		if (!this.textBox.contains(e.target)) {
			this.setState({ ...this.state, buttonShowing: false });
		}
	};

	onDocumentKeyDown = (e) => {
		if (e.key === "Escape" || e.keyCode === 27) {
			this.setState({ ...this.state, buttonShowing: false });
		}
	};

	onDeleteButtonClick = (event) => {
		if (event.button === 0) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onDeleteButtonClick();
		}
	};

	onLabelClick = (event) => {
		if (event.button === 0) {
			event.preventDefault();
			// event.stopPropagation();
			this.props.onLabelClick();
		}
	};

	onNumberChange = (event) => {
		this.props.onNumberChange(event);
	};
}
