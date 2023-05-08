import styled from "styled-components";
import React from "react";
import { useRef } from "react";
// import InputAnchor from "./InputAnchor";
import { useState } from "react";

const edgeLength = 15;
const textOffset = 16;
const quarterCircle = Math.PI / 2;

function LineMeasurement(props) {
	const {
		selected,
		onSelected,
		onModeChange,
		x,
		y,
		line,
		parentWidth,
		parentHeight,
		measureLine,
		onChange,
		onMidMouse,
	} = props;
	const [clicked, setClicked] = useState(false);
	const [doubleClick, setDoubleClick] = useState(false);
	const startDragInProgress = useRef(false);
	const endDragInProgress = useRef(false);
	const midDragInProgress = useRef(false);

	const mouseXAtPress = useRef();
	const mouseYAtPress = useRef();
	const lineAtPress = useRef();
	const startXAtPress = useRef();
	const startYAtPress = useRef();
	const endXAtPress = useRef();
	const endYAtPress = useRef();

	// Line layout:
	const startX = line.startX * parentWidth;
	const startY = line.startY * parentHeight;
	const endX = line.endX * parentWidth;
	const endY = line.endY * parentHeight;
	const deltaX = endX - startX;
	const deltaY = endY - startY;
	const rotate = Math.atan2(deltaY, deltaX);
	const edgeX = (edgeLength * Math.sin(rotate)) / 3.0;
	const edgeY = (edgeLength * Math.cos(rotate)) / 3.0;

	// Text layout (make sure the text is never rotated so much to be upside down):
	const centerX = (startX + endX) / 2;
	const centerY = (startY + endY) / 2;
	const rotateIsSmall = Math.abs(rotate) <= quarterCircle;
	const offsetX = (rotateIsSmall ? -1 : 1) * textOffset * Math.sin(rotate);
	const offsetY = (rotateIsSmall ? 1 : -1) * textOffset * Math.cos(rotate);
	const textX = centerX + offsetX;
	const textY = centerY + offsetY;
	const textRotate = Math.atan2(offsetY, offsetX) - quarterCircle;

	const text = measureLine(line);

	const onStartMouseDown = (event) => {
		if (event.button === 0) {
			startDragInProgress.current = true;
			event.preventDefault();
			onDragBegin(event.clientX, event.clientY);
		}
	};

	const onMidMouseDown = (event) => {
		if (event.button === 0) {
			midDragInProgress.current = true;
			event.preventDefault();
			onDragBegin(event.clientX, event.clientY);
		}
	};

	const onEndMouseDown = (event) => {
		if (event.button === 0) {
			endDragInProgress.current = true;
			event.preventDefault();
			onDragBegin(event.clientX, event.clientY);
		}
	};

	const onDragBegin = (eventX, eventY) => {
		setClicked(true);
		onSelected(`line${line.id}`);
		mouseXAtPress.current = eventX;
		mouseYAtPress.current = eventY;
		lineAtPress.current = line;
		startXAtPress.current = line.startX * parentWidth;
		startYAtPress.current = line.startY * parentHeight;
		endXAtPress.current = line.endX * parentWidth;
		endYAtPress.current = line.endY * parentHeight;
	};

	const onMouseMove = (x, y) => {
		if (!clicked) return;
		onDrag(x, y);
	};

	const onDrag = (eventX, eventY) => {
		if (startDragInProgress.current) {
			const startX = clamp(getXAfterDrag(startXAtPress, eventX));
			const startY = clamp(getYAfterDrag(startYAtPress, eventY));
			console.log(startX, startY);
			onChange({ ...line, startX, startY });
		} else if (endDragInProgress.current) {
			const endX = clamp(getXAfterDrag(endXAtPress, eventX));
			const endY = clamp(getYAfterDrag(endYAtPress, eventY));
			onChange({ ...line, endX, endY });
		} else if (midDragInProgress.current) {
			let startX = getXAfterDrag(startXAtPress, eventX);
			let startY = getYAfterDrag(startYAtPress, eventY);
			let endX = getXAfterDrag(endXAtPress, eventX);
			let endY = getYAfterDrag(endYAtPress, eventY);
			const deltaX = endX - startX;
			const deltaY = endY - startY;
			// Don't let the line be dragged outside the layer bounds:
			if (startX < 0) {
				startX = 0;
				endX = deltaX;
			} else if (startX > 1) {
				startX = 1;
				endX = 1 + deltaX;
			}
			if (startY < 0) {
				startY = 0;
				endY = deltaY;
			} else if (startY > 1) {
				startY = 1;
				endY = 1 + deltaY;
			}
			if (endX < 0) {
				startX = -deltaX;
				endX = 0;
			} else if (endX > 1) {
				startX = 1 - deltaX;
				endX = 1;
			}
			if (endY < 0) {
				startY = -deltaY;
				endY = 0;
			} else if (endY > 1) {
				startY = 1 - deltaY;
				endY = 1;
			}
			onChange({ ...line, startX, startY, endX, endY });
		}
	};

	const getXAfterDrag = (xAtPress, clientX) =>
		(xAtPress.current + clientX - mouseXAtPress.current) / parentWidth;

	const getYAfterDrag = (yAtPress, clientY) =>
		(yAtPress.current + clientY - mouseYAtPress.current) / parentHeight;

	const onMouseUp = (event) => {
		endDrag();
	};

	const endDrag = () => {
		if (!clicked) return;
		if (startDragInProgress.current) {
			startDragInProgress.current = false;
		}
		if (midDragInProgress) {
			midDragInProgress.current = false;
		}
		if (endDragInProgress) {
			endDragInProgress.current = false;
		}
		setClicked(false);
	};

	const onMidMouseEnter = (event) => {
		onMidMouse("enter");
	};

	const onMidMouseLeave = (event) => {
		onMidMouse("leave");
	};

	const clamp = (value) => Math.min(1, Math.max(0, value));

	const onDeleteButtonClick = () => onDeleteButtonClick(line);

	const onLabelClick = () => {
		onLabelClick(line);
	};

	const onNumberChange = (e) => {
		onNumberChange(line, e);
	};

	return (
		<Container
			onMouseMove={(e) => onMouseMove(e.clientX, e.clientY)}
			onMouseUp={onMouseUp}
			onBlur={endDrag}
			width={parentWidth}
			height={parentHeight}
			dragging={clicked}
		>
			<SVG>
				<G selected={selected == "" || selected == `line${line.id}`}>
					<MidGrabber
						x1={startX}
						y1={startY}
						x2={endX}
						y2={endY}
						onMouseDown={onMidMouseDown}
						onMouseEnter={onMidMouseEnter}
						onMouseLeave={onMidMouseLeave}
					/>
					<Line x1={startX} y1={startY} x2={endX} y2={endY} />
				</G>
				<G selected={selected == "" || selected == `line${line.id}`}>
					<Grabber
						x1={startX - edgeX}
						y1={startY + edgeY}
						x2={startX + edgeX}
						y2={startY - edgeY}
						onMouseDown={onStartMouseDown}
						onMouseEnter={onMidMouseEnter}
						onMouseLeave={onMidMouseLeave}
					/>
					<Circle cx={startX} cy={startY} r={4} />
				</G>
				<G selected={selected == "" || selected == `line${line.id}`}>
					<Grabber
						x1={endX - edgeX}
						y1={endY + edgeY}
						x2={endX + edgeX}
						y2={endY - edgeY}
						onMouseDown={onEndMouseDown}
						onMouseEnter={onMidMouseEnter}
						onMouseLeave={onMidMouseLeave}
					/>
					<Circle cx={endX} cy={endY} r={4} />
				</G>
			</SVG>
			{/* <InputAnchor
				x={textX}
				y={textY}
				rotate={textRotate}
				onLabelClick={onLabelClick}
				onNumberChange={onNumberChange}
				onDeleteButtonClick={onDeleteButtonClick}
				label={line.label}
				number={line.number}
				onInput={onInput}
				onInputClick={onInputClick}
				onInputBlur={onInputBlur}
			/> */}
		</Container>
	);
}

export default React.memo(LineMeasurement);

const Container = styled.div.attrs((props) => ({
	style: {
		width: props.width + "px",
		height: props.height + "px",
	},
}))`
	position: absolute;
	top: 0px;
	pointer-events: ${(props) => (props.dragging ? "auto" : "none")};
`;

const SVG = styled.svg`
	stroke: red;
	fill: red;
	stroke-width: 3px;
	cursor: pointer;
	width: 100%;
	height: 100%;
`;

const Circle = styled.circle`
	pointer-events: none;
`;

const Grabber = styled.line`
	stroke-width: 11;
	stroke-linecap: square;
	stroke: transparent;
`;

const MidGrabber = styled.line`
	stroke-width: 11;
	stroke-linecap: square;
	stroke: transparent;
	stroke-linecap: butt;
`;

const Line = styled.line`
	pointer-events: none;
`;

const G = styled.g`
	pointer-events: ${(props) => (props.selected ? "auto" : "none")};
`;
