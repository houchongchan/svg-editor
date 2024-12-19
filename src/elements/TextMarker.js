import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import InputAnchor from "./InputAnchor";

import { BoxLoader } from "./Loaders";

function TextMarker(props) {
	const {
		onSelected,
		selected,
		onModeChange,
		x,
		y,
		text,
		parentWidth,
		parentHeight,
		onChange,
		onChangeClick,
		onDeleteClick,
	} = props;

	const [clicked, setClicked] = useState(false);
	const [loading, setLoading] = useState(true);

	const topDragInProgress = useRef(false);
	const bottomDragInProgress = useRef(false);
	const leftDragInProgress = useRef(false);
	const rightDragInProgress = useRef(false);
	const midDragInProgress = useRef(false);
	const dragOccurred = useRef(false);

	const mouseXAtPress = useRef();
	const mouseYAtPress = useRef();
	const rectAtPress = useRef();
	const startXAtPress = useRef();
	const startYAtPress = useRef();
	const widthAtPress = useRef();
	const heightAtPress = useRef();

	useEffect(() => {
		const interval = setTimeout(() => setLoading(false), 500);

		return () => clearTimeout(interval);
	}, []);

	const onStartMouseDown = (event, direction) => {
		if (event.button === 0) {
			onModeChange("text");
			if (direction === 1 || direction === 5 || direction === 6) {
				topDragInProgress.current = true;
			}
			if (direction === 3 || direction === 5 || direction === 7) {
				rightDragInProgress.current = true;
			}
			if (direction === 2 || direction === 6 || direction === 8) {
				leftDragInProgress.current = true;
			}
			if (direction === 4 || direction === 7 || direction === 8) {
				bottomDragInProgress.current = true;
			}
			event.preventDefault();
			onDragBegin(event.clientX, event.clientY, direction);
		}
	};

	const onMidMouseDown = (event) => {
		if (event.button === 0) {
			onModeChange("text");
			midDragInProgress.current = true;
			event.preventDefault();
			onDragBegin(event.clientX, event.clientY);
		}
	};

	const onDragBegin = (eventX, eventY, direction = 0) => {
		setClicked(true);

		mouseXAtPress.current = eventX;
		mouseYAtPress.current = eventY;

		rectAtPress.current = text;
		startXAtPress.current = text.x;
		startYAtPress.current = text.y;
		widthAtPress.current = text.width;
		heightAtPress.current = text.height;
	};

	const onMouseMove = (x, y) => {
		if (!clicked) return;
		onSelected();
		onDrag(x, y);
	};

	const onDrag = (eventX, eventY) => {
		if (topDragInProgress.current && rightDragInProgress.current) {
			const [height, y] = getTopAfterDrag(startYAtPress, heightAtPress, eventY);
			const [width, x] = getLeftAfterDrag(startXAtPress, widthAtPress, eventX);
			onChange({
				...text,
				width,
				x,
				height,
				y,
			});
			return;
		}
		if (topDragInProgress.current && leftDragInProgress.current) {
			const [height, y] = getTopAfterDrag(startYAtPress, heightAtPress, eventY);
			const width = getWidthAfterDrag(widthAtPress, eventX);
			onChange({
				...text,
				width,
				height,
				y,
			});
			return;
		}

		if (bottomDragInProgress.current && rightDragInProgress.current) {
			const height = getHeightAfterDrag2(heightAtPress, eventY);
			const width = getWidthAfterDrag(widthAtPress, eventX);
			onChange({
				...text,
				width,
				height,
			});
			return;
		}
		if (bottomDragInProgress.current && leftDragInProgress.current) {
			const [width, x] = getLeftAfterDrag(startXAtPress, widthAtPress, eventX);
			const height = getHeightAfterDrag2(heightAtPress, eventY);
			onChange({
				...text,
				width,
				height,
				x,
			});
			return;
		}
		if (topDragInProgress.current) {
			const [height, y] = getTopAfterDrag(startYAtPress, heightAtPress, eventY);

			onChange({
				...text,
				height,
				y,
			});
		} else if (bottomDragInProgress.current) {
			const height = getHeightAfterDrag2(heightAtPress, eventY);
			onChange({
				...text,
				height,
			});
		} else if (leftDragInProgress.current) {
			const [width, x] = getLeftAfterDrag(startXAtPress, widthAtPress, eventX);
			onChange({
				...text,
				width,
				x,
			});
		} else if (rightDragInProgress.current) {
			const width = getWidthAfterDrag(widthAtPress, eventX);
			onChange({
				...text,
				width,
			});
		} else if (midDragInProgress.current) {
			let x = getXAfterDrag(startXAtPress, eventX);
			let y = getYAfterDrag(startYAtPress, eventY);

			const rightBound = x + widthAtPress.current;
			const bottomBound = y + heightAtPress.current;

			// Don't let the line be dragged outside the layer bounds:
			if (x < 0) {
				x = 0;
			} else if (rightBound > parentWidth) {
				x = parentWidth - widthAtPress.current;
			}
			if (y < 0) {
				y = 0;
			} else if (bottomBound > parentHeight) {
				y = parentHeight - heightAtPress.current;
			}
			onChange({ ...text, x, y });
		}
	};

	const getLeftAfterDrag = (xAtPress, width, clientX) => {
		const tmp = clientX - mouseXAtPress.current;
		return [width.current - tmp, xAtPress.current + tmp];
	};
	const getWidthAfterDrag = (width, clientX) =>
		width.current + clientX - mouseXAtPress.current;

	const getTopAfterDrag = (yAtPress, height, clientY) => {
		const tmp = clientY - mouseYAtPress.current;
		return [height.current - tmp, yAtPress.current + tmp];
	};

	const getHeightAfterDrag2 = (height, clientY) =>
		height.current + clientY - mouseYAtPress.current;

	const getXAfterDrag = (xAtPress, clientX) =>
		xAtPress.current + clientX - mouseXAtPress.current;

	const getYAfterDrag = (yAtPress, clientY) =>
		yAtPress.current + clientY - mouseYAtPress.current;

	const onMouseUp = (event) => {
		endDrag();
	};

	const endDrag = () => {
		if (!clicked) return;
		if (dragOccurred) {
			dragOccurred.current = false;
		}

		if (topDragInProgress.current) {
			topDragInProgress.current = false;
		}
		if (bottomDragInProgress) {
			bottomDragInProgress.current = false;
		}
		if (leftDragInProgress) {
			leftDragInProgress.current = false;
		}
		if (rightDragInProgress) {
			rightDragInProgress.current = false;
		}
		if (midDragInProgress) {
			midDragInProgress.current = false;
		}
		onModeChange("image");
		setClicked(false);
	};

	return (
		<Container
			onMouseMove={() => onMouseMove(x, y)}
			onMouseUp={onMouseUp}
			onBlur={endDrag}
			width={parentWidth}
			height={parentHeight}
			dragging={clicked}
		>
			{!loading ? (
				<>
					<Input
						contentEditable="true"
						x={text.x + 5}
						y={text.y + 5}
						width={text.width - 10}
						height={text.height - 10}
					>
						{text.text}
					</Input>
					<SVG>
						<G selected={selected === "" || selected === `text${text.id}`}>
							<Line
								x1={text.x}
								y1={text.y}
								x2={text.x + text.width}
								y2={text.y}
							/>
						</G>
						<G selected={selected === "" || selected === `text${text.id}`}>
							<Line
								x1={text.x}
								y1={text.y}
								x2={text.x}
								y2={text.y + text.height}
							/>
						</G>
						<G selected={selected === "" || selected === `text${text.id}`}>
							<Line
								x1={text.x + text.width}
								y1={text.y}
								x2={text.x + text.width}
								y2={text.y + text.height}
							/>
						</G>
						<G selected={selected === "" || selected === `text${text.id}`}>
							<Line
								x1={text.x}
								y1={text.y + text.height}
								x2={text.x + text.width}
								y2={text.y + text.height}
							/>
						</G>
						<G selected={selected === "" || selected === `text${text.id}`}>
							<MiniRect
								x={text.x - 10 / 2}
								y={text.y - 10 / 2}
								width={10}
								height={10}
								onMouseDown={onMidMouseDown}
							/>
							<MiniRect
								x={text.x + text.width - 5 / 2}
								y={text.y - 5 / 2}
								width={5}
								height={5}
								onMouseDown={(e) => onStartMouseDown(e, 6)}
							/>
							<MiniRect
								x={text.x + text.width - 5 / 2}
								y={text.y + text.height - 5 / 2}
								width={5}
								height={5}
								onMouseDown={(e) => onStartMouseDown(e, 7)}
							/>
							<MiniRect
								x={text.x - 5 / 2}
								y={text.y + text.height - 5 / 2}
								width={5}
								height={5}
								onMouseDown={(e) => onStartMouseDown(e, 8)}
							/>
						</G>
					</SVG>

					{!clicked && (
						<InputAnchor
							id={text.id}
							x={text.x + 20}
							y={text.y - 20}
							type={"text"}
							onChangeClick={onChangeClick}
							onDeleteClick={onDeleteClick}
						/>
					)}
				</>
			) : (
				<BoxLoader x={text.x + text.width / 2} y={text.y + text.height / 2} />
			)}
		</Container>
	);
}

export default React.memo(TextMarker);

const Container = styled.div.attrs((props) => ({
	style: {
		width: props.width + "px",
		height: props.height + "px",
	},
}))`
	position: absolute;
	top: 0px;
	pointer-events: ${(props) => (props.dragging ? "all" : "none")};
	z-index: 5;
`;

const SVG = styled.svg`
	stroke-width: 3px;
	cursor: pointer;
	width: 100%;
	height: 100%;
	stroke-dasharray: 10, 3;
`;

const Line = styled.line`
	pointer-events: none;
	stroke: var(--purple);
`;

const G = styled.g`
	pointer-events: ${(props) => (props.selected ? "auto" : "none")};
`;

const Input = styled.text.attrs((props) => ({
	style: {
		width: props.width + "px",
		height: props.height + "px",
	},
}))`
	position: absolute;
	top: ${(props) => props.y}px;
	left: ${(props) => props.x}px;
	width: fit-content;
	height: fit-content;
	pointer: cursor;
	pointer-events: auto;
	outline: 0px solid transparent;
	margin: 5px;
`;

const MiniRect = styled.rect`
	fill: orange;
	stroke-width: 1px;
	stroke: var(--puce);
`;
