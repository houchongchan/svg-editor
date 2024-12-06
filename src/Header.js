import styled from "styled-components";

export default function Header() {
	return (
		<Container>
			<Title>SVG Editor</Title>
		</Container>
	);
}

const Container = styled.div``;

const Title = styled.div`
	width: 100%;
	text-align: center;
	font-size: 30px;
	font-weight: 700;
	height: 25px;

	color: var(--tea);
	padding: 8px 20px;
`;
