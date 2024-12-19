import styled from "styled-components";
import { useEffect, useRef } from "react";
import InputAnchor from "./InputAnchor";
import React from "react";
import { useState } from "react";
import { CircleLoader } from "./Loaders";

function CircleMarker(props) {
	const {
		onSelected,
		selected,
		onModeChange,
		x,
		y,
		circle,
		parentWidth,
		parentHeight,
		onChange,
		onChangeClick,
		onDeleteClick,
	} = props;

	const [clicked, setClicked] = useState(false);
	const [loading, setLoading] = useState(true);

	const radiusDragInProgress = useRef(false);
	const midDragInProgress = useRef(false);
	const dragOccurred = useRef(false);

	const startXAtPress = useRef();
	const startYAtPress = useRef();
	const radiusAtPress = useRef();

	const mouseXAtPress = useRef();
	const mouseYAtPress = useRef();
	const circleAtPress = useRef();

	// circle layout:

	const centerX = circle.x;
	const centerY = circle.y;

	useEffect(() => {
		const interval = setTimeout(() => setLoading(false), 500);

		return () => clearTimeout(interval);
	}, []);

	const onStartMouseDown = (event, direction) => {
		onModeChange("circle");
		if (direction) {
			radiusDragInProgress.current = true;
		}
		event.preventDefault();
		onDragBegin(event.clientX, event.clientY, direction);
	};

	const onMidMouseDown = (event) => {
		event.preventDefault();
		onModeChange("circle");
		midDragInProgress.current = true;
		onDragBegin(event.clientX, event.clientY);
	};

	const onDragBegin = (eventX, eventY, direction = 0) => {
		setClicked(true);
		mouseXAtPress.current = eventX;
		mouseYAtPress.current = eventY;
		circleAtPress.current = circle;
		startXAtPress.current = circle.x;
		startYAtPress.current = circle.y;
		radiusAtPress.current = circle.radius;
	};

	const onMouseMove = (x, y) => {
		if (!clicked) return;
		onSelected();
		onDrag(x, y);
	};

	const onDrag = (eventX, eventY) => {
		if (radiusDragInProgress.current) {
			const radius = getRadiusAfterDrag(radiusAtPress, eventX, eventY);
			onChange({
				...circle,
				radius,
			});
			return;
		} else if (midDragInProgress.current) {
			let x = getXAfterDrag(startXAtPress, eventX);
			let y = getYAfterDrag(startYAtPress, eventY);

			const rightBound = x + radiusAtPress.current;
			const bottomBound = y + radiusAtPress.current;

			// Don't let the line be dragged outside the layer bounds:
			if (x < 0) {
				x = 0;
			} else if (rightBound > parentWidth) {
				x = parentWidth - radiusAtPress.current;
			}
			if (y < 0) {
				y = 0;
			} else if (bottomBound > parentHeight) {
				y = parentHeight - radiusAtPress.current;
			}
			onChange({ ...circle, x, y });
		}
	};

	const getRadiusAfterDrag = (radius, clientX, clientY) =>
		radius.current +
		Math.hypot(
			clientX - mouseXAtPress.current,
			clientY - mouseYAtPress.current
		);

	const getXAfterDrag = (xAtPress, clientX) =>
		xAtPress.current + clientX - mouseXAtPress.current;

	const getYAfterDrag = (yAtPress, clientY) =>
		yAtPress.current + clientY - mouseYAtPress.current;

	const onMouseUp = () => {
		endDrag();
	};

	const endDrag = () => {
		if (!clicked) return;
		if (dragOccurred) {
			dragOccurred.current = false;
		}
		if (radiusDragInProgress) {
			radiusDragInProgress.current = false;
		}
		if (midDragInProgress) {
			midDragInProgress.current = false;
		}
		onModeChange("image");
		setClicked(false);
	};

	// const onDeleteButtonClick = () => onDeleteButtonClick(line);

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
						<G selected={selected === "" || selected === `circle${circle.id}`}>
							<MidGrabber
								cx={centerX}
								cy={centerY}
								r={circle.radius - 10}
								onMouseDown={onMidMouseDown}
							/>
						</G>
						<G selected={selected === "" || selected === `circle${circle.id}`}>
							<RadiusGrabber
								cx={centerX}
								cy={centerY}
								r={circle.radius - 4}
								onMouseDown={(e) => onStartMouseDown(e, 1)}
							/>
							<UnFilledCircle cx={centerX} cy={centerY} r={circle.radius} />
						</G>
					</SVG>
					{!clicked && (
						<InputAnchor
							id={circle.id}
							x={centerX}
							y={centerY}
							width={circle.radius}
							height={circle.radius}
							type={"circle"}
							onChangeClick={onChangeClick}
							onDeleteClick={onDeleteClick}
						/>
					)}
				</>
			) : (
				<CircleLoader x={centerX} y={centerY} />
			)}
		</Container>
	);
}

export default React.memo(CircleMarker);

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

const MidGrabber = styled.circle`
	stroke-width: 6;
	stroke-linecap: square;
	stroke: transparent;
	fill: transparent;
	cursor: move;
	z-index: 10;
`;

const RadiusGrabber = styled.circle`
	stroke-width: 10;
	stroke-linecap: square;
	stroke: transparent;
	fill: none;
	cursor: grab;
`;

const UnFilledCircle = styled.circle`
	stroke-width: 3;
	pointer-events: none;
	stroke: var(--purple);
	fill: transparent;
`;

const G = styled.g`
	pointer-events: ${(props) => (props.selected ? "auto" : "none")};
`;
