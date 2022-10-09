// Use this function to interpolate between two colors
const colorLerp = (color1, color2, percentage) => {
	const [rStart, gStart, bStart] = [color1 & 0xff0000, color1 & 0xff00, color1 & 0xff];
	const [rDiff, gDiff, bDiff] = [
		(color2 & 0xff0000) - rStart,
		(color2 & 0xff00) - gStart,
		(color2 & 0xff) - bStart];

	return '#' + (Math.floor(rStart + rDiff * percentage) & 0xff0000
			| Math.floor(gStart + gDiff * percentage) & 0xff00
			| Math.floor(bStart + bDiff * percentage) & 0xff).toString(16).padStart(6, '0');
};
