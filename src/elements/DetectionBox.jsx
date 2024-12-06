import styled from "styled-components";
import React, { useRef, useState } from "react";
import { ReactComponent as RemoveIcon } from "../icons/remove2.svg";
import { nonPathologyColor, pathologyColor } from "../CSSComponents";
import BoxNumber from "./BoxNumber";
import BoxSurfaces from "./BoxSurfaces";
import { toothOrientation } from "../Utils";
import { detectionTypes } from "../../constants";

function DetectionBox(props) {
	const {
		box,
		boxType,
		event,
		FDI,
		initialScale,
		onChange,
		onClick,
		onDisplayChange,
		onRemove,
		onSelected,
		parentWidth,
		parentHeight,
		selected,
		selectSurfaceDropdown,
		showSurface,
		showUI,
		onDetectionSelected,
		xrayType,
	} = props;

	const [clicked, setClicked] = useState(false);
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

	const [flipHorizontal, flipVertical] = toothOrientation(box.tooth, FDI);
	const scale = xrayType
		? initialScale > event.scale
			? 0.75
			: 0.6
		: event.scale < 0.25
		? 0.8
		: 1;

	const yBottom = box.y + box.height;
	const xRight = box.x + box.width;

	const sizeRatio = (box.width * box.height) / (parentHeight * parentWidth);

	const onStartMouseDown = (event, direction) => {
		if (event.button === 0) {
			if (direction === "n" || direction === "nw" || direction === "ne") {
				topDragInProgress.current = true;
			}
			if (direction === "e" || direction === "nw" || direction === "se") {
				rightDragInProgress.current = true;
			}
			if (direction === "w" || direction === "ne" || direction === "sw") {
				leftDragInProgress.current = true;
			}
			if (direction === "s" || direction === "se" || direction === "sw") {
				bottomDragInProgress.current = true;
			}
			event.preventDefault();
			onDragBegin(event.clientX, event.clientY, direction);
		}
	};

	const onMidMouseDown = (event) => {
		if (event.button === 0) {
			onSelected();
			midDragInProgress.current = true;
			event.preventDefault();
			onDragBegin(event.clientX, event.clientY);
		}
	};

	const onDragBegin = (eventX, eventY, direction = "") => {
		setClicked(true);
		onSelected(`box${box.id}`);
		if (direction === "n" || direction === "s") {
			mouseXAtPress.current = box.x;
			mouseYAtPress.current = eventY;
		}
		if (direction === "w" || direction === "e") {
			mouseXAtPress.current = eventX;
			mouseYAtPress.current = box.y;
		} else {
			mouseXAtPress.current = eventX;
			mouseYAtPress.current = eventY;
		}
		rectAtPress.current = box;
		startXAtPress.current = box.x;
		startYAtPress.current = box.y;
		widthAtPress.current = box.width;
		heightAtPress.current = box.height;
	};

	const onMouseMove = (x, y) => {
		if (!clicked) return;
		onDrag(x, y);
	};

	const onDrag = (eventX, eventY) => {
		const margin = 10;
		if (topDragInProgress.current && rightDragInProgress.current) {
			const [height, y] = getTopAfterDrag(startYAtPress, heightAtPress, eventY);
			const [width, x] = getLeftAfterDrag(startXAtPress, widthAtPress, eventX);
			if (width < margin || height < margin) return;
			onChange({
				...box,
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
			if (width < margin || height < margin) return;
			onChange({
				...box,
				width,
				height,
				y,
			});
			return;
		}

		if (bottomDragInProgress.current && rightDragInProgress.current) {
			const height = getHeightAfterDrag(heightAtPress, eventY);
			const width = getWidthAfterDrag(widthAtPress, eventX);
			if (width < margin || height < margin) return;
			onChange({
				...box,
				width,
				height,
			});
			return;
		}
		if (bottomDragInProgress.current && leftDragInProgress.current) {
			const [width, x] = getLeftAfterDrag(startXAtPress, widthAtPress, eventX);
			const height = getHeightAfterDrag(heightAtPress, eventY);
			if (width < margin || height < margin) return;
			onChange({
				...box,
				width,
				height,
				x,
			});
			return;
		}
		if (topDragInProgress.current) {
			const [height, y] = getTopAfterDrag(startYAtPress, heightAtPress, eventY);
			if (height < margin) return;
			onChange({
				...box,
				height,
				y,
			});
		} else if (bottomDragInProgress.current) {
			const height = getHeightAfterDrag(heightAtPress, eventY);
			if (height < margin) return;
			onChange({
				...box,
				height,
			});
		} else if (leftDragInProgress.current) {
			const [width, x] = getLeftAfterDrag(startXAtPress, widthAtPress, eventX);
			if (width < margin) return;
			onChange({
				...box,
				width,
				x,
			});
		} else if (rightDragInProgress.current) {
			const width = getWidthAfterDrag(widthAtPress, eventX);
			if (width < margin) return;
			onChange({
				...box,
				width,
			});
		} else if (midDragInProgress.current) {
			let x = getXAfterDrag(startXAtPress, eventX);
			let y = getYAfterDrag(startYAtPress, eventY);

			const rightBound = (x + widthAtPress.current) * event.scale;
			const bottomBound = (y + heightAtPress.current) * event.scale;

			// Don't let the line be dragged outside the layer bounds:
			if (x < 0) {
				x = 0;
			} else if (rightBound > parentWidth) {
				x = parentWidth / event.scale - widthAtPress.current;
			}
			if (y < 0) {
				y = 0;
			} else if (bottomBound > parentHeight) {
				y = parentHeight / event.scale - heightAtPress.current;
			}
			onChange({ ...box, x, y });
		}
	};

	const getLeftAfterDrag = (xAtPress, width, clientX) => {
		const tmp = (clientX - mouseXAtPress.current) / event.scale;
		return [width.current - tmp, xAtPress.current + tmp];
	};
	const getWidthAfterDrag = (width, clientX) =>
		width.current + (clientX - mouseXAtPress.current) / event.scale;

	const getTopAfterDrag = (yAtPress, height, clientY) => {
		const tmp = (clientY - mouseYAtPress.current) / event.scale;
		return [height.current - tmp, yAtPress.current + tmp];
	};

	const getHeightAfterDrag = (height, clientY) =>
		height.current + (clientY - mouseYAtPress.current) / event.scale;

	const getXAfterDrag = (xAtPress, clientX) =>
		xAtPress.current + (clientX - mouseXAtPress.current) / event.scale;

	const getYAfterDrag = (yAtPress, clientY) =>
		yAtPress.current + (clientY - mouseYAtPress.current) / event.scale;

	const onMouseUp = () => {
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
		onSelected("");
		setClicked(false);
	};

	return (
		<Container
			onMouseMove={(e) => onMouseMove(e.clientX, e.clientY)}
			size={sizeRatio}
			onMouseUp={onMouseUp}
			onBlur={endDrag}
			width={parentWidth}
			height={parentHeight}
			dragging={clicked}
		>
			{showUI && (
				<BoxInterface
					selected={selected == "" || selected == `box${box.id}`}
					scale={scale}
					active={box.active}
					key={box.id}
					offsetX={box.x * event.scale}
					offsetY={box.y * event.scale}
				>
					<BoxNumber
						data={box}
						onChange={onDisplayChange}
						onSelected={() => onDetectionSelected(box.id)}
					/>
					{showSurface && box.class !== "calculus" && (
						<BoxSurfaces
							data={box}
							flipHorizontal={flipHorizontal}
							flipVertical={flipVertical}
							onChange={onDisplayChange}
							onClick={selectSurfaceDropdown}
							onSelected={() => onDetectionSelected(box.id)}
							surface={box.surface}
						/>
					)}
					{box.active && (
						<Remove data-id="box-delete" onClick={() => onRemove(box.id)}>
							<RemoveIcon />
						</Remove>
					)}
				</BoxInterface>
			)}
			<SVG
				selected={box.active}
				boxType={boxType}
				boxClass={box.class}
				onClick={() => {
					onDetectionSelected(box.id);
					onClick(box.id);
				}}
			>
				<G selected={selected == "" || selected == `box${box.id}`}>
					<Rectangle
						data-id="move-box"
						selected={selected == `box${box.id}`}
						x={box.x * event.scale}
						y={box.y * event.scale}
						width={box.width * event.scale}
						height={box.height * event.scale}
						onMouseDown={onMidMouseDown}
					/>
				</G>
				<G selected={selected == "" || selected == `box${box.id}`}>
					<MidGrabber
						x1={box.x * event.scale}
						y1={(box.y - 2) * event.scale}
						x2={xRight * event.scale}
						y2={(box.y - 2) * event.scale}
						grabber={"n-resize"}
						onMouseDown={(e) => onStartMouseDown(e, "n")}
					/>
					<Line
						x1={box.x * event.scale}
						y1={box.y * event.scale}
						x2={xRight * event.scale}
						y2={box.y * event.scale}
					/>
					{box.active && (
						<ActiveLine
							x1={box.x * event.scale - 1.5}
							y1={box.y * event.scale - 1.5}
							x2={xRight * event.scale + 1.5}
							y2={box.y * event.scale - 1.5}
						/>
					)}
				</G>
				<G selected={selected == "" || selected == `box${box.id}`}>
					<MidGrabber
						x1={(box.x - 2) * event.scale}
						y1={box.y * event.scale}
						x2={(box.x - 2) * event.scale}
						y2={yBottom * event.scale}
						grabber={"w-resize"}
						onMouseDown={(e) => onStartMouseDown(e, "w")}
					/>
					<Line
						x1={box.x * event.scale}
						y1={box.y * event.scale}
						x2={box.x * event.scale}
						y2={yBottom * event.scale}
					/>
					{box.active && (
						<ActiveLine
							x1={box.x * event.scale - 1.5}
							y1={box.y * event.scale - 1.5}
							x2={box.x * event.scale - 1.5}
							y2={yBottom * event.scale + 1.5}
						/>
					)}
				</G>
				<G selected={selected == "" || selected == `box${box.id}`}>
					<MidGrabber
						x1={(xRight + 2) * event.scale}
						y1={box.y * event.scale}
						x2={(xRight + 2) * event.scale}
						y2={yBottom * event.scale}
						grabber={"e-resize"}
						onMouseDown={(e) => onStartMouseDown(e, "e")}
					/>
					<Line
						x1={xRight * event.scale}
						y1={box.y * event.scale}
						x2={xRight * event.scale}
						y2={yBottom * event.scale}
					/>
					{box.active && (
						<ActiveLine
							x1={xRight * event.scale + 1.5}
							y1={box.y * event.scale - 1.5}
							x2={xRight * event.scale + 1.5}
							y2={yBottom * event.scale + 1.5}
						/>
					)}
				</G>
				<G selected={selected == "" || selected == `box${box.id}`}>
					<MidGrabber
						x1={box.x * event.scale}
						y1={(yBottom + 2) * event.scale}
						x2={xRight * event.scale}
						y2={(yBottom + 2) * event.scale}
						grabber={"s-resize"}
						onMouseDown={(e) => onStartMouseDown(e, "s")}
					/>
					<Line
						x1={box.x * event.scale}
						y1={yBottom * event.scale}
						x2={xRight * event.scale}
						y2={yBottom * event.scale}
					/>
					{box.active && (
						<ActiveLine
							x1={box.x * event.scale - 1.5}
							y1={yBottom * event.scale + 1.5}
							x2={xRight * event.scale + 1.5}
							y2={yBottom * event.scale + 1.5}
						/>
					)}
				</G>
				<Corners selected={selected == `box${box.id}`}>
					<Circle
						cx={box.x * event.scale}
						cy={box.y * event.scale}
						r={3}
						grabber={"nw-resize"}
						onMouseDown={(e) => onStartMouseDown(e, "nw")}
					/>
					<Circle
						cx={xRight * event.scale}
						cy={box.y * event.scale}
						r={3}
						grabber={"ne-resize"}
						onMouseDown={(e) => onStartMouseDown(e, "ne")}
					/>
					<Circle
						cx={xRight * event.scale}
						cy={yBottom * event.scale}
						r={3}
						grabber={"se-resize"}
						onMouseDown={(e) => onStartMouseDown(e, "se")}
					/>
					<Circle
						cx={box.x * event.scale}
						cy={yBottom * event.scale}
						r={3}
						grabber={"sw-resize"}
						onMouseDown={(e) => onStartMouseDown(e, "sw")}
					/>
				</Corners>
				{box.active && <use href="#one" />}
			</SVG>
		</Container>
	);
}

export default React.memo(DetectionBox);

const BoxInterface = styled.div.attrs((props) => ({
	style: {
		left: props.offsetX + "px",
		top: props.offsetY - 25 * props.scale + "px",
		transform: "scale(" + props.scale + ")",
	},
}))`
	transform-origin: top left;
	align-items: center;
	background: rgba(0, 0, 0, 0.7);
	border: 1px solid
		${(props) => (props.active ? "var(--bright-turquoise)" : "transparent")};
	border-radius: 3px;
	color: var(--white);
	display: flex;
	height: 22px;
	justify-content: center;
	position: absolute;
	z-index: ${(props) => (props.active ? "55" : "1")};
	pointer-events: ${(props) => (props.selected ? "auto" : "none")};

	&:hover {
		border: 1px solid var(--bright-turquoise);
	}
`;

const Container = styled.div.attrs((props) => ({
	style: {
		width: props.width + "px",
		height: props.height + "px",
	},
}))`
	position: absolute;
	top: 0px;
	pointer-events: ${(props) => (props.dragging ? "all" : "none")};
	z-index: ${({ size }) => Math.round(55 / size)};
`;

const Corners = styled.g`
	fill: ${(props) => (props.selected ? "#FFFFFF" : "transparent")};
	stroke: ${(props) => (props.selected ? "#33ffe2" : "transparent")};
	stroke-width: 2px;
`;

const G = styled.g`
	pointer-events: ${(props) => (props.selected ? "auto" : "none")};
`;

const Line = styled.line`
	pointer-events: none;
`;

const ActiveLine = styled.line`
	stroke-width: 1;
	stroke-linecap: square;
	stroke: var(--bright-turquoise);
	pointer-events: none;
	cursor: ${(props) => props.grabber};
`;

const MidGrabber = styled.line`
	stroke-width: 4;
	stroke-linecap: square;
	stroke: transparent;
	cursor: ${(props) => props.grabber};
`;

const Circle = styled.circle`
	cursor: ${(props) => props.grabber};
	pointer-events: auto;
`;

const Rectangle = styled.rect`
	fill: transparent;
	stroke: transparent;
	cursor: move;
`;

const Remove = styled.button`
	align-items: center;
	cursor: pointer;
	display: flex;
	height: 100%;
	width: 18px;
`;

const SVG = styled.svg`
	stroke-width: 2px;
	stroke: ${(props) =>
		props.boxType === detectionTypes.nonPathology
			? nonPathologyColor(props.boxClass)
			: pathologyColor(props.boxClass)};
	stroke-dasharray: ${({ boxClass, selected }) =>
		boxClass === "wisdom_tooth" && !selected ? "8 12" : "none"};
	cursor: pointer;
	width: 100%;
	height: 100%;
`;
