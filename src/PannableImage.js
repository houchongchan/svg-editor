import React, { useRef, useState } from "react";
import BoxMarker from "./elements/BoxMarker";
import styled from "styled-components";
import LineMeasurement from "./elements/LineMeasurement";
import { initialCircle, initialLine, initialRect } from "./utils/Config";
import { useMovingAndScaling } from "./utils/useMovingAndScaling";
import CircleMarker from "./elements/CircleMarker";

const PannableImage = ({ src }) => {
	const [panning, setPanning] = useState(false);
	const [image, setImage] = useState({
		width: 0,
		height: 0,
	});
	const [position, setPosition] = useState({
		oldX: 0,
		oldY: 0,
		x: 0,
		y: 0,
		z: 1,
	});

	const [lines, setLines] = useState(initialLine);
	const [rectangles, setRectangles] = useState(initialRect);
	const [circles, setCircles] = useState(initialCircle);

	const [selected, setSelected] = useState("");
	const [dimensions, setDimensions] = useState({ sign: 0, scale: 1 });
	const [scale, setScale] = useState(1);
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

			setDimensions({ sign: sign, scale: 1 - sign });
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
			setScale(scale);
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
			>
				<Image
					alt="image"
					src={src}
					onLoad={onLoad}
					draggable={false}
					data-pannable
					onMouseDown={() => setMode("image")}
					parentWidth={image.width}
					parentHeight={image.height}
				/>
				{lines &&
					lines.map((e) => {
						return (
							<LineMeasurement
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
								onMidMouse={() => {}}
								onLabelClick={() => {}}
								onNumberChange={() => {}}
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
								onMidMouse={() => {}}
								onInput={() => {}}
								onInputClick={() => {}}
								onInputBlur={() => {}}
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
								onMidMouse={() => {}}
								onInput={() => {}}
								onInputClick={() => {}}
								onInputBlur={() => {}}
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
	height: 100%;
`;

const Pannable = styled.div`
	position: relative;
	transition: scale 0.1s ease-in-out;
`;
const Image = styled.img`
	opacity: 0.6;
	width ${(props) => props.parentWidth}px;
	height ${(props) => props.parentHeight}px;
	
`;
