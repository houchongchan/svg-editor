import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as PolygonIcon } from "../icons/polygon.svg";
import { ReactComponent as Box } from "../icons/box.svg";
import { ReactComponent as Line } from "../icons/line.svg";
import { ReactComponent as Lasso } from "../icons/lasso.svg";
import { ReactComponent as Circle } from "../icons/circle.svg";

export default function InputAnchor({ x, y }) {
	const [showSelections, setShowSelections] = useState(false);
	const onDeleteButtonClick = (event) => {
		if (event.button === 0) {
			event.preventDefault();
			event.stopPropagation();
		}
	};

	return (
		<Container x={x} y={y}>
			<AddButton
				onMouseEnter={() => setShowSelections(true)}
				className={"text-box"}
				expand={showSelections}
			>
				<PolygonIcon />
			</AddButton>
			{showSelections && (
				<Menu onMouseLeave={() => setShowSelections(false)}>
					<Button top={"0%"} left={"-100%"}>
						<Box />
					</Button>
					<Button top={"-100%"} left={"0%"}>
						<Line />
					</Button>
					<Button top={"0%"} left={"100%"}>
						<Lasso />
					</Button>
					<Button top={"100%"} left={"0%"}>
						<Circle />
					</Button>
				</Menu>
			)}
		</Container>
	);
}

const AddButton = styled.div`
	width: 50px;
	text-align: center;
	height: 50px;
	background: var(--rosy);
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;

	svg: {
		width: 100%;
		stroke: white;
		fill: white;
	}
`;

const Button = styled.div`
	width: 50px;
	text-align: center;
	height: 50px;
	background: var(--rosy);
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	top: ${(props) => props.top};
	left: ${(props) => props.left};
	position: absolute;

	svg: {
		width: 100%;
		stroke: white;
		fill: white;
	}
`;

const Container = styled.div.attrs((props) => ({
	style: {
		left: props.x,
		top: props.y,
		transform: "scale(" + props.scale + ")",
	},
}))`
	position: absolute;
	top: 0;
	left: 0;
	transform-origin: top left;
	align-items: center;
	background: rgba(0, 0, 0, 0.7);
	border: 1px solid
		${(props) => (props.active ? "var(--bright-turquoise)" : "transparent")};
	border: 1px solid
		${(props) => (props.active ? "var(--bright-turquoise)" : "transparent")};
	border-radius: 3px;
	color: var(--white);
	display: flex;
	height: 22px;
	justify-content: center;
	position: absolute;
	z-index: ${(props) => (props.active ? "55" : "1")};
	// pointer-events: ${(props) => (props.selected ? "auto" : "none")};
	pointer-events: auto;

	background: transparent;
	pointer: cursor;

	&:hover {
		border: 1px solid var(--bright-turquoise);
	}
`;

const Mini = styled.div`
	width: 100%;
	height: 100%;
`;

const Menu = styled.div`
	width: 50px;
	height: 50px;
	position: absolute;
	top: 0;
	left: 0;
	transform-origin: center center;
`;
