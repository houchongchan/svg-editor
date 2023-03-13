import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LineMeasurement from "./LineMeasurement";
import { initial } from "./Config";

const PannableImage = ({ src }) => {
	const [panning, setPanning] = useState(false);
	const [mode, setMode] = useState("image");
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
	const [lines, setLines] = useState(initial);

	const cursorRef = useRef({ x: 0, y: 0 });
	const containerRef = useRef();

	const onLoad = (e) => {
		setImage({
			width: e.target.naturalWidth,
			height: e.target.naturalHeight,
		});
	};

	const onMouseDown = (e) => {
		if (mode !== "image") {
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
		if (mode !== "image") {
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
		if (mode !== "image") {
			return;
		}

		const mouseup = () => {
			setPanning(false);
		};

		const mousemove = (event) => {
			if (panning) {
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
			onMouseMove={(event) =>
				(cursorRef.current = { x: event.clientX, y: event.clientY })
			}
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
					onMouseDown={() => setMode("image")}
				/>
				{lines &&
					lines.map((e) => {
						return (
							<LineMeasurement
								onModeChange={(e) => setMode(e)}
								x={cursorRef.current.x}
								y={cursorRef.current.y}
								doubleClicked={false}
								key={e.id}
								line={e}
								parentWidth={image.width}
								parentHeight={image.height}
								measureLine={() => {}}
								onChange={(e) => onChange(e)}
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

const Container = styled.div`
	background: rgba(0, 255, 255, 0.5);
	overflow: hidden;
`;

const Pannable = styled.div`
	position: relative;
`;
const Image = styled.img`
	opacity: 0.5;
`;
