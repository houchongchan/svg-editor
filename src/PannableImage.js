import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import SVG from "../SVG";
// import Segment from "../Segment";
import LineMeasurement from "./LineMeasurement";
import { initial } from "./Config";

const PannableImage = ({ src }) => {
	// https://jkettmann.com/jr-to-sr-refactoring-react-pan-and-zoom-image-component
	const [isPanning, setPanning] = useState(false);
	const [mode, setMode] = useState("pan");
	const [image, setImage] = useState({
		width: 0,
		height: 0,
	});
	const [cursor, setCursor] = useState({ x: 0, y: 0 });
	const [position, setPosition] = useState({
		oldX: 0,
		oldY: 0,
		x: 0,
		y: 0,
		z: 1,
	});
	const [lines, setLines] = useState(initial);

	const containerRef = useRef();

	const onLoad = (e) => {
		setImage({
			width: e.target.naturalWidth,
			height: e.target.naturalHeight,
		});
	};

	const onMouseDown = (e) => {
		if (mode !== "pan") {
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

	const onWheel = (e) => {
		if (mode !== "pan") {
			return;
		}

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

	useEffect(() => {
		if (mode !== "pan") {
			return;
		}

		const mouseup = () => {
			setPanning(false);
		};

		const mousemove = (event) => {
			if (isPanning) {
				setPosition({
					...position,
					x: position.x + event.clientX - position.oldX,
					y: position.y + event.clientY - position.oldY,
					oldX: event.clientX,
					oldY: event.clientY,
				});
			}
		};

		window.addEventListener("mouseup", mouseup);
		window.addEventListener("mousemove", mousemove);

		return () => {
			window.removeEventListener("mouseup", mouseup);
			window.removeEventListener("mousemove", mousemove);
		};
	});

	const onChange = (m) => {
		const tmp = lines.filter((x) => x.id !== m.id);
		setLines([m, ...tmp]);
	};

	return (
		<Container
			onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
			ref={containerRef}
			onMouseDown={onMouseDown}
			onWheel={onWheel}
		>
			<Pannable
				style={{
					transform: `translate(${position.x}px, ${position.y}px) scale(${position.z})`,
				}}
			>
				<Image
					alt="pollen"
					src={src}
					onLoad={onLoad}
					onMouseDown={() => setMode("pan")}
				/>
				{lines &&
					lines.map((e) => {
						return (
							<LineMeasurement
								lines={lines}
								onModeChange={(e) => setMode(e)}
								x={cursor.x}
								y={cursor.y}
								doubleClicked={false}
								key={e.id}
								line={e}
								parentWidth={image.width}
								parentHeight={image.height}
								measureLine={() => {}}
								onDoubleClick={() => {}}
								onChange={(e) => onChange(e)}
								onCommit={() => {}}
								onDeleteButtonClick={() => {}}
								onMidMouse={() => {}}
								onLabelClick={() => {}}
								onNumberChange={() => {}}
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

const Container = styled.div``;

const Pannable = styled.div`
	position: relative;
`;
const Image = styled.img`
	opacity: 0.2;
`;
