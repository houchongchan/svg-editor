import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import InputAnchor from "./InputAnchor";
import { LineLoader } from "./Loaders";

const edgeLength = 15;

function LineMarker(props) {
	const {
		selected,
		onSelected,
		line,
		parentWidth,
		parentHeight,
		onChange,
		onChangeClick,
		onDeleteClick,
	} = props;

	const [clicked, setClicked] = useState(false);
	const [loading, setLoading] = useState(true);

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

	const centerX = (startX + endX) / 2;
	const centerY = (startY + endY) / 2;

	useEffect(() => {
		const interval = setTimeout(() => setLoading(false), 500);

		return () => clearTimeout(interval);
	}, []);

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

	const clamp = (value) => Math.min(1, Math.max(0, value));

	return (
		<Container
			onMouseMove={(e) => onMouseMove(e.clientX, e.clientY)}
			onMouseUp={onMouseUp}
			onBlur={endDrag}
			width={parentWidth}
			height={parentHeight}
			dragging={clicked}
		>
			{!loading ? (
				<>
					<SVG>
						<G selected={selected === "" || selected === `line${line.id}`}>
							<MidGrabber
								x1={startX}
								y1={startY}
								x2={endX}
								y2={endY}
								onMouseDown={onMidMouseDown}
							/>
							<Line x1={startX} y1={startY} x2={endX} y2={endY} />
						</G>
						<G selected={selected === "" || selected === `line${line.id}`}>
							<Grabber
								x1={startX - edgeX}
								y1={startY + edgeY}
								x2={startX + edgeX}
								y2={startY - edgeY}
								onMouseDown={onStartMouseDown}
							/>
							<Circle cx={startX} cy={startY} r={4} />
						</G>
						<G selected={selected === "" || selected === `line${line.id}`}>
							<Grabber
								x1={endX - edgeX}
								y1={endY + edgeY}
								x2={endX + edgeX}
								y2={endY - edgeY}
								onMouseDown={onEndMouseDown}
							/>
							<Circle cx={endX} cy={endY} r={4} />
						</G>
					</SVG>
					{!clicked && (
						<InputAnchor
							id={line.id}
							x={centerX}
							y={centerY}
							type={"line"}
							onChangeClick={onChangeClick}
							onDeleteClick={onDeleteClick}
						/>
					)}
				</>
			) : (
				<LineLoader x={centerX} y={centerY} />
			)}
		</Container>
	);
}

export default React.memo(LineMarker);

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
	stroke: var(--purple);
	fill: var(--purple);
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
