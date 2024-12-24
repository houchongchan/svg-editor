import styled from "styled-components";

export default function Footer() {
	return <Container>@houchongchan@gmail.com</Container>;
}

const Container = styled.div`
	display: flex;
	height: 30px;
	background: #1b263b;
	color: var(--puce);
	font-weight: 600;
	font-size: 20px;
	justify-content: center;
	align-items: center;
	transition: height 1s linear;
`;
