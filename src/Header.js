import styled from "styled-components";
import { ReactComponent as PolygonIcon } from "./icons/polygon.svg";

export default function Header({ loadLanding }) {
	return (
		<Container loadLanding={loadLanding}>
			<MovingDisplay>
				<Moving>
					<Polygon loadLanding={loadLanding} />
				</Moving>
				<Title loadLanding={loadLanding}>SVG Editor</Title>
				<StationaryPolygon
					loadLanding={loadLanding}
					opacity={!loadLanding ? 1 : 0}
				/>
			</MovingDisplay>
			<div class="road"></div>
		</Container>
	);
}

const Moving = styled.div`
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
			transform: translate(0px, 0px);
		}
	}
	animation: moving_left 3s linear;
`;

const StationaryPolygon = styled(PolygonIcon)`
	fill: ${({ loadLanding }) => (!loadLanding ? "var(--puce)" : "black")};
	transition: fill 2s linear;
`;

const Polygon = styled(PolygonIcon)`
	@keyframes rotating {
		0% {
			transform: rotate(0deg);
		}
		20% {
			transform: rotate(-360deg);
		}
		40% {
			transform: rotate(-720deg);
		}
		80% {
			transform: rotate(-1080deg);
		}
		100% {
			transform: rotate(-1080deg);
		}
	}
	// fill: ${({ loadLanding }) => (!loadLanding ? "var(--puce)" : "black")};
	transform-origin: center center;
	animation: rotating 2s linear;
`;

const Title = styled.div`
	text-align: center;
	font-size: 30px;
	font-weight: 700;
	color: ${({ loadLanding }) =>
		!loadLanding ? "var(--puce)" : "var(--purple)"};
	opacity: ${({ loadLanding }) => (!loadLanding ? "1" : "0")};
	padding: 8px 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MovingDisplay = styled.div`
	display: flex;
	transition: opacity 0.3s linear;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: ${({ loadLanding }) => (!loadLanding ? "70px" : "100vh")};
	background: ${({ loadLanding }) =>
		!loadLanding ? "#1b263b" : "transparent"};
	justify-content: center;
	align-items: center;
	transition: height 2s linear, background 2s linear;
	.road {
		height: 15px;
		width: ${({ loadLanding }) => (!loadLanding ? "100%" : "500px")};
		background: black;
		transition: width 0.5s linear;
	}
`;
