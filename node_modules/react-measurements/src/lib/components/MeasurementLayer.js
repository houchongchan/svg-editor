import React, { PureComponent } from "react";
import MeasurementLayerBase from "./core/MeasurementLayerBase";
import "./MeasurementLayer.css";

export default class MeasurementLayer extends PureComponent {
	state = { mode: null };

	render() {
		const hasSize = this.props.widthInPx > 0 && this.props.heightInPx > 0;
		return (
			hasSize && (
				<div className="measurement-layer" ref={(e) => (this.root = e)}>
					<MeasurementLayerBase
						disabled={this.state.disabled}
						measurements={this.props.measurements}
						onChange={this.props.onChange}
						widthInPx={this.props.widthInPx}
						heightInPx={this.props.heightInPx}
						measureLine={this.props.measureLine}
						measureCircle={this.props.measureCircle}
						mode={this.state.mode}
						onCommit={this.onCommit}
						onMidMouse={this.props.onMidMouse}
					/>
				</div>
			)
		);
	}

	add = () => {
		this.setState({ mode: "line" });
	};

	disable = () => {
		this.setState({ mode: null, disabled: true });
	};

	enable = () => {
		this.setState({ mode: null, disabled: false });
	};

	start = (event) => {
		this.setState({ event });
	};

	onCommit = (measurement) => {
		this.setState({ mode: null });
		if (this.props.onCommit) {
			this.props.onCommit(measurement);
		}
	};
}
