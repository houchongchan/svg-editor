import styled from "styled-components";
import { ReactComponent as Box } from "../icons/box.svg";
import { ReactComponent as Line } from "../icons/line.svg";
import { ReactComponent as Lasso } from "../icons/lasso.svg";
import { ReactComponent as Circle } from "../icons/circle.svg";

export default function Controls() {
	return (
		<Container>
			<Toolbar>
				<AddButton>
					<Box />
				</AddButton>
				<AddButton>
					<Line />
				</AddButton>
				<AddButton>
					<Lasso />
				</AddButton>
				<AddButton>
					<Circle />
				</AddButton>
			</Toolbar>
			<Upload>Upload</Upload>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	z-index: 100;
	padding-top: 20px;
`;

const Toolbar = styled.div`
	display: flex;
	gap: 10px;
	justify-content: space-between;
	z-index: 100;
`;
const Upload = styled.div`
	display: flex;
	padding: 8px 20px;
	text-align: center;
	border-radius: 4px;
	justify-content: space-between;
	background: var(--rosy);
	color: white;
	z-index: 100;
	padding-top: 20px;
	cursor: pointer;
`;

const AddButton = styled.div`
	width: 50px;
	text-align: center;
	height: 50px;
	background: var(--rosy);
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	svg: {
		width: 100%;
		stroke: white;
		fill: white;
	}
`;
