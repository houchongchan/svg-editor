import styled from "styled-components";
import PannableImage from "./PannableImage";
import Picture from "./images/test.jpg";
import Controls from "./controls/Controls";
import Header from "./Header";

function App() {
	return (
		<Container>
			<Header />
			<ImageWrapper>
				<PannableImage src={Picture} />
			</ImageWrapper>
			<Controls />
		</Container>
	);
}

export default App;

const Container = styled.div`
	background: var(--magenta);
	height: 95vh;
	width: 95vw;
	overflow: none;
`;

const ImageWrapper = styled.div`
	input,
	button,
	submit {
		border: none;
	}
	height: 50%;
	border: 3px solid var(--puce);
	z-index: 1;
`;
