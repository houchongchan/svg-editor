import styled from "styled-components";
import { ReactComponent as PolygonIcon } from "./icons/polygon.svg";
import { useEffect, useState } from "react";

export default function Header() {
	const [height, setHeight] = useState(false);

	useEffect(() => {
		const interval = setTimeout(() => setHeight(true), 5000);

		return () => clearTimeout(interval);
	}, []);

	return (
		<Container height={height}>
			{!height && (
				<>
					<Moving play={!height}>
						<Polygon />
					</Moving>
					<Title height={0}>SVG Editor</Title>
					<PolygonIcon opacity={height ? 1 : 0} />
				</>
			)}
			<Display height={height}>
				<PolygonIcon />
				<Title height={1}>SVG Editor</Title>
				<PolygonIcon />
			</Display>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	height: ${({ height }) => (height ? "70px" : "100vh")};

	justify-content: center;
	align-items: center;
	transition: height 1s linear;
`;

const Moving = styled.div`
	transform: translateY(100px);
	@keyframes moving_left {
		0% {
			transform: translate(240px, -100px);
		}
		10% {
			transform: translate(190px, 0px);
		}
		20% {
			transform: translate(140px, -80px);
		}
		30% {
			transform: translate(90px, 0px);
		}
		40% {
			transform: translate(60px, -40px);
		}
		50% {
			transform: translate(40px, 0px);
		}
		60% {
			transform: translate(30px, -20px);
		}
		70% {
			transform: translate(20px, 0px);
		}
		100% {
			transform: translateX(0px);
		}
	}
	${({ play }) => play && "animation: moving_left 5s linear;"});
`;

const Polygon = styled(PolygonIcon)`
	@keyframes rotating {
		0 {
			transform: rotate(360deg);
		}
		70% {
			transform: rotate(0deg);
		}
		100 {
			transform: rotate(-1deg);
		}
	}

	animation: rotating 3s linear infinite;
`;

const Title = styled.div`
	text-align: center;
	font-size: 30px;
	font-weight: 700;
	color: var(--purple);
	opacity: ${({ height }) => (height ? "1" : "0")};
	padding: 8px 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Display = styled.div`
	display: flex;
	opacity: ${({ height }) => (height ? "1" : "0")};
	${({ height }) => !height && "width: 0;"}
	transition: opacity 1s linear;
	padding: 8px 15px;
`;
