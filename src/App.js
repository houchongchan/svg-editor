import styled from "styled-components";
import PannableImage from "./PannableImage";
import Picture from "./images/test.jpg";

function App() {
	return (
		<>
			<Text>SVG Editor</Text>
			<Container>
				<PannableImage src={Picture} />
			</Container>
		</>
	);
}

export default App;

const Container = styled.div`
	input,
	button,
	submit {
		border: none;
	}
	height: 50%;
	border: 2px solid black;
	z-index: 1;
`;

const Text = styled.div`
	width: 100%;
	text-align: center;
	height: 25px;
`;
