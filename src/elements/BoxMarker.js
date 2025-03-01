import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import InputAnchor from "./InputAnchor";

import { BoxLoader } from "./Loaders";

function BoxMarker(props) {
	const {
		onSelected,
		selected,
		onModeChange,
		x,
		y,
		rectangle,
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
			onModeChange("box");
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
			onModeChange("box");
			midDragInProgress.current = true;
			event.preventDefault();
			onDragBegin(event.clientX, event.clientY);
		}
	};

	const onDragBegin = (eventX, eventY, direction = 0) => {
		setClicked(true);
		if (direction === 1 || direction === 4) {
			mouseXAtPress.current = rectangle.x;
			mouseYAtPress.current = eventY;
		}
		if (direction === 2 || direction === 3) {
			mouseXAtPress.current = eventX;
			mouseYAtPress.current = rectangle.y;
		} else {
			mouseXAtPress.current = eventX;
			mouseYAtPress.current = eventY;
		}
		rectAtPress.current = rectangle;
		startXAtPress.current = rectangle.x;
		startYAtPress.current = rectangle.y;
		widthAtPress.current = rectangle.width;
		heightAtPress.current = rectangle.height;
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
				...rectangle,
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
				...rectangle,
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
				...rectangle,
				width,
				height,
			});
			return;
		}
		if (bottomDragInProgress.current && leftDragInProgress.current) {
			const [width, x] = getLeftAfterDrag(startXAtPress, widthAtPress, eventX);
			const height = getHeightAfterDrag2(heightAtPress, eventY);
			onChange({
				...rectangle,
				width,
				height,
				x,
			});
			return;
		}
		if (topDragInProgress.current) {
			const [height, y] = getTopAfterDrag(startYAtPress, heightAtPress, eventY);

			onChange({
				...rectangle,
				height,
				y,
			});
		} else if (bottomDragInProgress.current) {
			const height = getHeightAfterDrag2(heightAtPress, eventY);
			onChange({
				...rectangle,
				height,
			});
		} else if (leftDragInProgress.current) {
			const [width, x] = getLeftAfterDrag(startXAtPress, widthAtPress, eventX);
			onChange({
				...rectangle,
				width,
				x,
			});
		} else if (rightDragInProgress.current) {
			const width = getWidthAfterDrag(widthAtPress, eventX);
			onChange({
				...rectangle,
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
			onChange({ ...rectangle, x, y });
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
					<SVG>
						<G selected={selected === "" || selected === `box${rectangle.id}`}>
							<Rectangle
								x={rectangle.x}
								y={rectangle.y}
								width={rectangle.width}
								height={rectangle.height}
								onMouseDown={onMidMouseDown}
							/>
						</G>
						<G selected={selected === "" || selected === `box${rectangle.id}`}>
							<MidGrabber
								x1={rectangle.x}
								y1={rectangle.y}
								x2={rectangle.x + rectangle.width}
								y2={rectangle.y}
								onMouseDown={(e) => onStartMouseDown(e, 1)}
							/>
							<Line
								x1={rectangle.x}
								y1={rectangle.y}
								x2={rectangle.x + rectangle.width}
								y2={rectangle.y}
							/>
						</G>
						<G selected={selected === "" || selected === `box${rectangle.id}`}>
							<MidGrabber
								x1={rectangle.x}
								y1={rectangle.y}
								x2={rectangle.x}
								y2={rectangle.y + rectangle.height}
								onMouseDown={(e) => onStartMouseDown(e, 2)}
							/>
							<Line
								x1={rectangle.x}
								y1={rectangle.y}
								x2={rectangle.x}
								y2={rectangle.y + rectangle.height}
							/>
						</G>
						<G selected={selected === "" || selected === `box${rectangle.id}`}>
							<MidGrabber
								x1={rectangle.x + rectangle.width}
								y1={rectangle.y}
								x2={rectangle.x + rectangle.width}
								y2={rectangle.y + rectangle.height}
								onMouseDown={(e) => onStartMouseDown(e, 3)}
							/>
							<Line
								x1={rectangle.x + rectangle.width}
								y1={rectangle.y}
								x2={rectangle.x + rectangle.width}
								y2={rectangle.y + rectangle.height}
							/>
						</G>
						<G selected={selected === "" || selected === `box${rectangle.id}`}>
							<MidGrabber
								x1={rectangle.x}
								y1={rectangle.y + rectangle.height}
								x2={rectangle.x + rectangle.width}
								y2={rectangle.y + rectangle.height}
								onMouseDown={(e) => onStartMouseDown(e, 4)}
							/>
							<Line
								x1={rectangle.x}
								y1={rectangle.y + rectangle.height}
								x2={rectangle.x + rectangle.width}
								y2={rectangle.y + rectangle.height}
							/>
						</G>
						<G selected={selected === "" || selected === `box${rectangle.id}`}>
							<MiniRect
								x={rectangle.x - 10 / 2}
								y={rectangle.y - 10 / 2}
								width={10}
								height={10}
								onMouseDown={(e) => onStartMouseDown(e, 5)}
							/>
							<MiniRect
								x={rectangle.x + rectangle.width - 10 / 2}
								y={rectangle.y - 10 / 2}
								width={10}
								height={10}
								onMouseDown={(e) => onStartMouseDown(e, 6)}
							/>
							<MiniRect
								x={rectangle.x + rectangle.width - 10 / 2}
								y={rectangle.y + rectangle.height - 10 / 2}
								width={10}
								height={10}
								onMouseDown={(e) => onStartMouseDown(e, 7)}
							/>
							<MiniRect
								x={rectangle.x - 10 / 2}
								y={rectangle.y + rectangle.height - 10 / 2}
								width={10}
								height={10}
								onMouseDown={(e) => onStartMouseDown(e, 8)}
							/>
						</G>
					</SVG>
					{!clicked && (
						<InputAnchor
							id={rectangle.id}
							x={rectangle.x + rectangle.width / 2}
							y={rectangle.y + rectangle.height / 2}
							type={"box"}
							onChangeClick={onChangeClick}
							onDeleteClick={onDeleteClick}
						/>
					)}
				</>
			) : (
				<BoxLoader
					x={rectangle.x + rectangle.width / 2}
					y={rectangle.y + rectangle.height / 2}
				/>
			)}
		</Container>
	);
}

export default React.memo(BoxMarker);

const Container = styled.div.attrs((props) => ({
	style: {
		width: props.width + "px",
		height: props.height + "px",
	},
}))`
	position: absolute;
	top: 0px;
	pointer-events: ${(props) => (props.dragging ? "all" : "none")};
`;

const SVG = styled.svg`
	stroke-width: 3px;
	cursor: pointer;
	width: 100%;
	height: 100%;
`;

const MidGrabber = styled.line`
	stroke-width: 11;
	stroke-linecap: square;
	stroke: transparent;
	stroke-linecap: butt;
	cursor: n-resize;
`;

const Line = styled.line`
	pointer-events: none;
	stroke: var(--purple);
`;

const G = styled.g`
	pointer-events: ${(props) => (props.selected ? "auto" : "none")};
`;

const Rectangle = styled.rect`
	fill: transparent;
	cursor: move;
`;

const MiniRect = styled.rect`
	fill: orange;
	stroke-width: 1px;
	stroke: var(--puce);
`;
