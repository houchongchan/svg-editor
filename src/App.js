import styled from "styled-components";
import PannableImage from "./PannableImage";
import Picture from "./images/test.jpg";

function App() {
	return (
		<Container>
			<PannableImage src={Picture} />
		</Container>
	);
}

export default App;

const Container = styled.div`
	input,
	button,
	submit {
		border: none;
	}
`;
