import { useCallback, useState } from "react";
// import { useHotkeys } from 'react-hotkeys-hook'

/*
  Hook for handling manipulation of Canvas,
  specifically for allowing scroll-to-move
  and pinch-to-zoom functionality in browser
*/

export const useMovingAndScaling = () => {
	const [offsetX, setOffsetX] = useState(0);
	const [offsetY, setOffsetY] = useState(0);
	const [scaleFactor, setScaleFactor] = useState(1);

	// useHotkeys('cmd+0', () => setScaleFactor(1))

	const onStageWheel = useCallback((e) => {
		// Handle pinch to zoom
		if (e.deltaY % 1 !== 0) {
			const scaleBy = 0.9;

			setScaleFactor((oldScale) =>
				e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy
			);

			return;
		}

		// Handle scroll
		setOffsetX((x) => x - e.deltaX);
		setOffsetY((y) => y - e.deltaY);
	}, []);

	const onPan = useCallback((e) => {
		setOffsetX((x) => x + e.movementX);
		setOffsetY((y) => y + e.movementY);
	}, []);

	return { offsetX, offsetY, scaleFactor, onStageWheel, onPan };
};
