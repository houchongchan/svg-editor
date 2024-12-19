import styled from "styled-components";

export const BoxLoader = styled.div.attrs((props) => ({
	style: {
		left: props.x - 25 + "px",
		top: props.y - 25 + "px",
	},
}))`
	position: absolute;
	width: 50px;
	aspect-ratio: 1;
	box-sizing: border-box;
	border-radius: 6px;
	background: radial-gradient(farthest-side, #ffa516 98%, transparent) 0 0/20px
			20px no-repeat,
		conic-gradient(from 90deg at 5px 5px, transparent 90deg, #ffa516 0)
			content-box,
		conic-gradient(from -90deg at 45px 45px, transparent 90deg, #ffa516 0)
			content-box,
		transparent;
	animation: l11 2s infinite;

	@keyframes l11 {
		0% {
			background-position: 0 0;
		}
		25% {
			background-position: 100% 0;
		}
		50% {
			background-position: 100% 100%;
		}
		75% {
			background-position: 0% 100%;
		}
		100% {
			background-position: 0% 0;
		}
	}
`;

export const CircleLoader = styled.div.attrs((props) => ({
	style: {
		left: props.x - 28 + "px",
		top: props.y - 28 + "px",
	},
}))`
	position: absolute;
	width: 50px;
	aspect-ratio: 1;
	border-radius: 50%;
	padding: 3px;
	background: radial-gradient(farthest-side, #ffa516 95%, transparent) 50% 0/12px
			12px no-repeat,
		radial-gradient(
				farthest-side,
				transparent calc(100% - 5px),
				#ffa516 calc(100% - 4px)
			)
			content-box;
	animation: l6 2s infinite;

	@keyframes l6 {
		to {
			transform: rotate(1turn);
		}
	}
`;

export const LineLoader = styled.div.attrs((props) => ({
	style: {
		left: props.x + "px",
		top: props.y + "px",
	},
}))`
	position: absolute;
	width: 50px;
	height: 5px;
	border-radius: 20px;
	background: linear-gradient(orange 0 0) 0/0% no-repeat transparent;
	animation: l2 2s infinite steps(10);

	@keyframes l2 {
		100% {
			background-size: 110%;
		}
	}
`;
