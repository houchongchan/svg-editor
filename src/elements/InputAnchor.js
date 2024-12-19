import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Box } from "../icons/box.svg";
import { ReactComponent as Line } from "../icons/line.svg";
import { ReactComponent as Lasso } from "../icons/lasso.svg";
import { ReactComponent as Circle } from "../icons/circle.svg";
import { ReactComponent as Delete } from "../icons/delete.svg";

export default function InputAnchor({
	id,
	x,
	y,
	type,
	onChangeClick,
	onDeleteClick,
}) {
	const [showSelections, setShowSelections] = useState(false);
	return (
		<Container x={x} y={y}>
			<AddButton
				onMouseEnter={() => setShowSelections(true)}
				className={"text-box"}
				expand={showSelections}
			/>
			<Menu onMouseLeave={() => setShowSelections(false)}>
				<Button
					top={"0%"}
					left={showSelections ? "-100%" : "0%"}
					expand={showSelections}
					disabled={"box" === type}
					onClick={() => onChangeClick(id, type, "box")}
				>
					<Box />
				</Button>
				<Button
					top={showSelections ? "-100%" : "0%"}
					left={"0%"}
					expand={showSelections}
					disabled={"line" === type}
					onClick={() => onChangeClick(id, type, "line")}
				>
					<Line />
				</Button>
				<Button
					top={"0%"}
					left={showSelections ? "100%" : "0%"}
					expand={showSelections}
					disabled={"lasso" === type}
					// onClick={() => onChangeClick(id, type, "lasso")}
				>
					<Lasso />
				</Button>
				<Button
					top={showSelections ? "100%" : "0%"}
					left={"0%"}
					expand={showSelections}
					disabled={"circle" === type}
					onClick={() => onChangeClick(id, type, "circle")}
				>
					<Circle />
				</Button>
				<CenterButton top={"0"} left={"0"} expand={showSelections}>
					<Delete onClick={() => onDeleteClick(id, type)} />
				</CenterButton>
			</Menu>
		</Container>
	);
}

const AddButton = styled.div`
	width: ${({ expand }) => (expand ? 50 : 10)}px;
	height: ${({ expand }) => (expand ? 50 : 10)}px;
	align-self: center;
	background: var(--rosy);
	border-radius: 25%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	z-index: 1;
	opacity: ${({ expand }) => (expand ? 0 : 1)};
	transition: all 0.25s ease-in;

	svg: {
		width: 100%;
		stroke: white;
		fill: white;
	}
`;

const Button = styled.button`
	width: 25px;
	text-align: center;
	height: 25px;
	background: var(--rosy);
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: all 0.5s ease-in-out;
	top: ${(props) => props.top};
	left: ${(props) => props.left};
	position: absolute;
	opacity: ${({ expand }) => (expand ? 1 : 0)};
	pointer-events: ${({ expand }) => (expand ? "auto" : "none")};

	&:disabled {
		background: var(--magenta);
		cursor: not-allowed;
	}

	svg: {
		width: 100%;
		stroke: white;
		fill: white;
	}
`;

const CenterButton = styled(Button)`
	background: transparent;
	justify-content: flex-end;
	align-items: flex-start;
	cursor: cursor;
	pointer-event: auto;
	z-index: 56;
`;

const Container = styled.div.attrs((props) => ({
	style: {
		left: `calc(${props.x}px - 12.5px )`,
		top: `calc(${props.y}px - 12.5px )`,
	},
}))`
	position: absolute;
	transform-origin: center center;
	align-items: center;
	background: rgba(0, 0, 0, 0.7);
	border: 1px solid
		${(props) => (props.active ? "var(--bright-turquoise)" : "transparent")};
	border: 1px solid
		${(props) => (props.active ? "var(--bright-turquoise)" : "transparent")};
	border-radius: 3px;
	color: var(--white);
	display: flex;
	justify-content: center;
	position: absolute;
	z-index: ${(props) => (props.active ? "55" : "1")};
	pointer-events: auto;
	width: 25px;
	height: 25px;

	background: transparent;
	pointer: cursor;

	&:hover {
		border: 1px solid var(--bright-turquoise);
	}
`;

const Menu = styled.div`
	width: 25px;
	height: 25px;
	position: absolute;
	top: 0;
	left: 0;
	transform-origin: center center;
`;
