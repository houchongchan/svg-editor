import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v1 as uuid } from "uuid";

export default function DiagnosticsView() {
	return (
		<Container>
			<Text>Container</Text>
			<Body>Hello </Body>
		</Container>
	);
}

const Body = styled.div`
	display: flex;
	height: 100%;
	margin-top: 4px;
	position: relative;
	color: var(--white);
`;

const Text = styled.div``;

const Button = styled.div`
	background-color: var(--tuna);
	bottom: 26px;
	cursor: pointer;
	height: 32px;
	padding-left: 8px;
	padding-top: 8px;
	position: absolute;
	right: 16px;
	width: 32px;
	z-index: 12;

	svg {
		fill: var(--white);
	}

	&:hover {
		background-color: var(--charade);
	}

	&:active {
		background-color: var(--bright-turquoise);

		svg {
			fill: var(--black2);
		}
	}
`;

const Container = styled.div`
	background-color: var(--black2);
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow-x: hidden;
	position: relative;
`;

const ModalContainer = styled.div`
	align-items: center;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	height: 100vh;
	position: absolute;
	width: 100vw;
	z-index: 105;
`;

const View = styled.div`
	height: 100%;
	left: 0;
	position: relative;
	width: 100%;
`;
