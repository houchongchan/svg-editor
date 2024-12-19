import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useMovingAndScaling } from "./utils/useMovingAndScaling";
import BoxMarker from "./elements/BoxMarker";
import CircleMarker from "./elements/CircleMarker";
import LineMarker from "./elements/LineMarker";
import TextMarker from "./elements/TextMarker";

const PannableImage = ({
	downloadRef,
	src,
	circles,
	lines,
	rectangles,
	texts,
	setLines,
	setCircles,
	setRectangles,
	setTexts,
	image,
	setImage,
}) => {
	const [panning, setPanning] = useState(false);
	const [position, setPosition] = useState({
		oldX: 0,
		oldY: 0,
		x: 0,
		y: 0,
		z: 1,
	});

	const [selected, setSelected] = useState("");
	const [mode, setMode] = useState("");

	const cursorRef = useRef({ x: 0, y: 0 });
	const containerRef = useRef();

	const { onStageWheel, onPan, offsetX, offsetY, scaleFactor } =
		useMovingAndScaling();

	const onLoad = (e) => {
		setImage({
			width: e.target.naturalWidth,
			height: e.target.naturalHeight,
		});
	};

	const onMouseDown = (e) => {
		if (e.target.getAttribute("data-pannable") !== "true") {
			return;
		}

		e.preventDefault();
		setPanning(true);
		setPosition({
			...position,
			oldX: e.clientX,
			oldY: e.clientY,
		});
	};

	const onMouseMove = (e) => {
		setSelected("");
		cursorRef.current = { x: e.clientX, y: e.clientY };

		if (!panning) return;

		onPan(e);
		if (e.deltaY) {
			const sign = Math.sign(e.deltaY) / 10;
			const scale = 1 - sign;

			const rect = containerRef.current.getBoundingClientRect();

			setPosition({
				...position,
				x: position.x * scale - (rect.width / 2 - e.clientX + rect.x) * sign,
				y:
					position.y * scale -
					((image.height * rect.width) / image.width / 2 - e.clientY + rect.y) *
						sign,
				z: position.z * scale,
			});
		}
	};

	const onChange = (m) => {
		const tmp = lines.filter((x) => x.id !== m.id);
		setLines([m, ...tmp]);
	};

	const onChange2 = (m) => {
		const tmp = rectangles.filter((x) => x.id !== m.id);
		setRectangles([m, ...tmp]);
	};

	const onChange3 = (m) => {
		const tmp = circles.filter((x) => x.id !== m.id);
		setCircles([m, ...tmp]);
	};

	const onChange4 = (m) => {
		const tmp = texts.filter((x) => x.id !== m.id);
		setTexts([m, ...tmp]);
	};

	const onDeleteClick = (id, oldType) => {
		if (oldType === "circle") {
			const tmp = circles.filter((x) => x.id !== id);

			setCircles([...tmp]);
		}
		if (oldType === "line") {
			const tmp = lines.filter((x) => x.id !== id);

			setLines([...tmp]);
		}

		if (oldType === "box") {
			const tmp = rectangles.filter((x) => x.id !== id);
			setRectangles([...tmp]);
		}
		if (oldType === "text") {
			const tmp = texts.filter((x) => x.id !== id);
			setTexts([...tmp]);
		}
	};

	const onChangeClick = (id, oldType, newType) => {
		const elements =
			oldType === "circle" ? circles : oldType === "box" ? rectangles : lines;

		const element = elements.find((e) => e.id === id);

		const newElements =
			newType === "circle" ? circles : newType === "box" ? rectangles : lines;

		if (newType === "circle") {
			const circle = {
				id: circles.length + 1,
				radius: 50,
				x: element.x,
				y: element.y,
			};
			setCircles([...newElements, circle]);
		}

		if (newType === "line") {
			const line = {
				id: lines.length + 1,
				type: "line",
				startX: 0.5,
				startY: 0.5,
				endX: 0.6,
				endY: 0.6,
			};
			setLines([...newElements, line]);
		}

		if (newType === "box") {
			const rectangle = {
				id: rectangles.length + 1,
				width: 50,
				height: 50,
				x: element.x,
				y: element.y,
			};
			setRectangles([...newElements, rectangle]);
		}

		if (oldType === "circle") {
			const tmp = circles.filter((x) => x.id !== id);
			setCircles([...tmp]);
		}

		if (oldType === "line") {
			const tmp = lines.filter((x) => x.id !== id);
			setLines([...tmp]);
		}

		if (oldType === "box") {
			const tmp = rectangles.filter((x) => x.id !== id);
			setRectangles([...tmp]);
		}
	};

	return (
		<Container
			ref={containerRef}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={() => setPanning(false)}
			onWheel={onStageWheel}
			data-pannable
		>
			<Pannable
				data-pannable
				style={{
					translate: `${offsetX}px ${offsetY}px`,
					scale: `${scaleFactor}`,
				}}
				ref={downloadRef}
			>
				<Image
					alt="image"
					src={src}
					onLoad={onLoad}
					draggable={false}
					data-pannable
					parentWidth={image.width}
					parentHeight={image.height}
				/>
				{lines &&
					lines.map((e) => {
						return (
							<LineMarker
								onSelected={() => setSelected(`line${e.id}`)}
								selected={selected}
								onModeChange={(e) => setMode(e)}
								x={cursorRef.current.x}
								y={cursorRef.current.y}
								key={e.id}
								line={e}
								parentWidth={image.width}
								parentHeight={image.height}
								measureLine={() => {}}
								onChange={(e) => onChange(e)}
								onChangeClick={onChangeClick}
								onDeleteClick={onDeleteClick}
							/>
						);
					})}
				{rectangles &&
					rectangles.map((e) => {
						return (
							<BoxMarker
								rectangle={e}
								onSelected={() => setSelected(`box${e.id}`)}
								selected={selected}
								onModeChange={(e) => setMode(e)}
								x={cursorRef.current.x}
								y={cursorRef.current.y}
								key={e.id}
								parentWidth={image.width}
								parentHeight={image.height}
								onChange={(e) => onChange2(e)}
								onChangeClick={onChangeClick}
								onDeleteClick={onDeleteClick}
							/>
						);
					})}
				{circles &&
					circles.map((e) => {
						return (
							<CircleMarker
								circle={e}
								onSelected={() => setSelected(`circle${e.id}`)}
								selected={selected}
								onModeChange={(e) => setMode(e)}
								x={cursorRef.current.x}
								y={cursorRef.current.y}
								key={e.id}
								parentWidth={image.width}
								parentHeight={image.height}
								onChange={(e) => onChange3(e)}
								onChangeClick={onChangeClick}
								onDeleteClick={onDeleteClick}
							/>
						);
					})}
				{texts &&
					texts.map((e) => {
						return (
							<TextMarker
								text={e}
								onSelected={() => setSelected(`text${e.id}`)}
								selected={selected}
								onModeChange={(e) => setMode(e)}
								x={cursorRef.current.x}
								y={cursorRef.current.y}
								key={e.id}
								parentWidth={image.width}
								parentHeight={image.height}
								onChange={(e) => onChange4(e)}
								onChangeClick={onChangeClick}
								onDeleteClick={onDeleteClick}
							/>
						);
					})}
			</Pannable>
		</Container>
	);
};

export default PannableImage;

const Container = styled.div`
	background: rgba(0, 0, 0, 0.8);
	overflow: hidden;
	display: flex;
	align-items: stretch;
	flex-grow: 1;
`;

const Pannable = styled.div`
	position: relative;
	transition: scale 0.1s ease-in-out;
	width: fit-content;
`;
const Image = styled.img`
	opacity: 0.6;
	width ${(props) => props.parentWidth}px;
	height ${(props) => props.parentHeight}px;
	
`;
