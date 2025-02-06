import styled from "styled-components";
import { ReactComponent as Expand } from "../icons/arrow.svg";
import { ReactComponent as Upload } from "../icons/upload.svg";
import { ReactComponent as Download } from "../icons/download.svg";
import { ReactComponent as Box } from "../icons/box.svg";
import { ReactComponent as Line } from "../icons/line.svg";
import { ReactComponent as Circle } from "../icons/circle.svg";
import { useEffect, useState } from "react";

export default function Controls({
	addMode,
	updateAddMode,
	setSrc,
	clearSelection,
	downloadImage,
}) {
	const [uploading, setUploading] = useState(false);
	const uploadImage = (e) => {
		const reader = new FileReader();
		const file = e.target.files[0];

		if (!file) {
			return;
		}

		setUploading(true);

		reader.readAsDataURL(file);

		reader.onload = () => {
			clearSelection();
			setSrc(reader.result);
			setUploading(false);
		};
	};

	useEffect(() => {
		if (uploading) {
			document.body.style.cursor = "wait";
		} else {
			document.body.style.cursor = "default";
		}
	}, [uploading]);

	return (
		<Container>
			<Top>
				<Section>
					<SmallButton>
						<Expand />
					</SmallButton>
					<Label disabled={uploading}>
						<Upload />
						<Button>
							<Input
								accept="image/*, */jpeg, */jpg, .jpg, .jpeg"
								type="file"
								name="image"
								onChange={uploadImage}
							/>
						</Button>
						Replace Image
					</Label>
					<SmallButton onClick={() => downloadImage()}>
						<Download /> Download Image
					</SmallButton>
				</Section>
				<Toolbar>
					<AddButton
						onClick={() => updateAddMode("box")}
						selected={addMode === "box"}
					>
						<Box /> Add Box
					</AddButton>
					<AddButton
						onClick={() => updateAddMode("line")}
						selected={addMode === "line"}
					>
						<Line /> Add Line
					</AddButton>
					<AddButton
						onClick={() => updateAddMode("text")}
						selected={addMode === "text"}
					>
						Add Text
					</AddButton>
					<AddButton
						onClick={() => updateAddMode("circle")}
						selected={addMode === "circle"}
					>
						<Circle /> Add Circle
					</AddButton>
				</Toolbar>
			</Top>
			<About>
				<P size={16}>About </P>

				<L size={14}>By: Hou chong chan</L>
				<L size={14}>
					Link to the project on
					<a href="https://github.com/houchongchan/svg-editor"> Github</a>
				</L>
			</About>
		</Container>
	);
}

const Label = styled.label`
	cursor: pointer;
	display: flex;
	padding: 5px 15px;
	border-radius: 4px;
	justify-content: flex-start;
	align-items: center;
	background: var(--deepblue);
	gap: 3px;
	color: var(--magenta);

	svg {
		fill: var(--magenta);
	}

	&:hover {
		background: var(--purple);

		svg {
			fill: var(--rosy);
		}
	}

	${({ disabled }) =>
		disabled &&
		`
		cursor: wait;
		pointer-events: none;
	`}
`;

const Input = styled.input`
	display: none;
`;

const Top = styled.div`
	width: 100%;
`;

const Button = styled.div`
	font-family: var(--font-family);
	font-size: var(--font-size-m);
	overflow: hidden;
	white-space: nowrap;

	@media (max-width: 1100px) {
		display: none;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	z-index: 100;
	padding: 10px 3px 3px 3px;
	background: #4c4b63;
`;

const Toolbar = styled.div`
	border-top: 2px solid var(--puce);
	padding-top: 20px;
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	justify-content: space-between;
	z-index: 100;
`;
const Section = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const AddButton = styled.div`
	width: 100%;
	height: 40px;
	background: ${({ selected }) =>
		selected ? "var(--lightpurp)" : "var(--rosy)"};
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

const SmallButton = styled.div`
	display: flex;
	padding: 5px 20px;
	border-radius: 4px;
	justify-content: flex-start;
	z-index: 100;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 6px;
	color: var(--magenta);
	padding: 5px 15px;

	background: var(--deepblue);

	svg {
		fill: var(--magenta);
	}

	&:hover {
		background: var(--purple);

		svg {
			fill: var(--rosy);
		}
	}
`;

const About = styled.div`
	width: 100%;
	background: lightgrey;
	border-radius: 6px;
	padding: 5px 8px;
	box-shadow: rgba(16, 10, 9, 0.15) 0px 1px 2px;
`;

const P = styled.div`
	font-size: ${({ size }) => size}px;
	padding: 3px 4px;
	color: var(--purple);
	font-weight: 800;
`;

const L = styled.div`
	font-size: ${({ size }) => size}px;
	padding: 0px 2px;
`;
