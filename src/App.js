import styled from "styled-components";
import PannableImage from "./PannableImage";
import {
	initialCircle,
	initialLine,
	initialRect,
	initialText,
} from "./utils/Config";
import Picture from "./images/test.jpg";
import Controls from "./controls/Controls";
import Header from "./Header";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import Footer from "./Footer";

function App() {
	const [addMode, addModeSet] = useState(null);
	const [loadLanding, setLoadLanding] = useState(true);
	const [expandHeight, setExpandHeight] = useState(true);
	const [lines, setLines] = useState(initialLine);
	const [rectangles, setRectangles] = useState(initialRect);
	const [circles, setCircles] = useState(initialCircle);
	const [texts, setTexts] = useState(initialText);
	const [image, setImage] = useState({
		width: 0,
		height: 0,
	});

	const [src, setSrc] = useState(Picture);
	const downloadRef = useRef();

	useEffect(() => {
		const interval = setTimeout(() => setLoadLanding(false), 3000);

		return () => clearTimeout(interval);
	}, []);

	useEffect(() => {
		if (loadLanding) return;
		const interval = setTimeout(() => setExpandHeight(false), 2000);

		return () => clearTimeout(interval);
	}, [loadLanding]);

	useEffect(() => {
		if (addMode !== null) {
			onAddClick();
			addModeSet(false);
		}
	}, [addMode]);

	const onAddClick = () => {
		if (addMode === "circle") {
			const circle = {
				id: circles.length + 1,
				radius: 50,
				x: image.width / 2,
				y: image.height / 2,
			};
			const tmp = circles;
			setCircles([...tmp, circle]);
		}

		if (addMode === "line") {
			const line = {
				id: lines.length + 1,
				type: "line",
				startX: 0.5,
				startY: 0.5,
				endX: 0.6,
				endY: 0.6,
			};
			const tmp = lines;
			setLines([...tmp, line]);
		}

		if (addMode === "box") {
			const rectangle = {
				id: rectangles.length + 1,
				width: 50,
				height: 50,
				x: image.width / 2,
				y: image.height / 2,
			};
			const tmp = rectangles;
			setRectangles([...tmp, rectangle]);
		}
		if (addMode === "text") {
			const text = {
				id: texts.length + 1,
				width: 50,
				height: 50,
				x: image.width / 2,
				y: image.height / 2,
			};
			const tmp = texts;
			setTexts([...tmp, text]);
		}
	};
	const clearSelection = () => {
		setCircles([]);
		setLines([]);
		setRectangles([]);
		setTexts([]);
	};

	const downloadImage = async () => {
		const canvas = await html2canvas(downloadRef.current);
		const dataUrl = canvas.toDataURL("image/png", 1.0);

		if (dataUrl.split(",")[1]) {
			const link = document.createElement("a");
			link.download = `sample.png`;
			link.href = dataUrl;
			link.click();
			return;
		}
	};

	return (
		<Container expandHeight={expandHeight}>
			<Header loadLanding={loadLanding} setLoadLanding={setLoadLanding} />
			{!expandHeight && (
				<Body>
					<Controls
						updateAddMode={addModeSet}
						addMode={addMode}
						setSrc={setSrc}
						clearSelection={clearSelection}
						downloadImage={downloadImage}
					/>
					<ImageWrapper>
						<PannableImage
							downloadRef={downloadRef}
							src={src}
							setRectangles={setRectangles}
							setCircles={setCircles}
							setLines={setLines}
							setTexts={setTexts}
							image={image}
							setImage={setImage}
							rectangles={rectangles}
							circles={circles}
							lines={lines}
							texts={texts}
							setMode={addModeSet}
						/>
					</ImageWrapper>
				</Body>
			)}
			{!expandHeight && <Footer />}
		</Container>
	);
}

export default App;

const Body = styled.div`
	display: flex;
	align-items: stretch;
	justify-content: stretch;
	flex-grow: 1;
`;

const Container = styled.div`
	background: var(--magenta);
	width: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	&::scrollbar {
		display: none;
	}
	${({ expandHeight }) => !expandHeight && "height: 100%;"}
	transition: height 1s linear;
`;

const ImageWrapper = styled.div`
	input,
	button,
	submit {
		border: none;
	}
	height: 100%;
	border: 3px solid var(--puce);
	z-index: 1;
	display: flex;
	flex-grow: 1;
`;
