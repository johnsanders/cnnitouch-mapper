const angleThreshold = 0.125;
const getLabelOffsetAtAngle = (angle: number, width: number, height: number, distance: number) => {
	console.log(angle);
	if (angle < Math.PI * 0.125 || angle > Math.PI * 1.875)
		// east
		return { x: distance * Math.cos(angle), y: distance * Math.sin(angle) };
	if (Math.abs(angle - Math.PI * 0.25) < angleThreshold)
		// southeast
		return { x: distance * Math.cos(angle), y: distance * Math.sin(angle) + height / 2 };
	if (Math.abs(angle - Math.PI * 0.5) < angleThreshold)
		//south
		return {
			x: distance * Math.cos(angle) - width / 2,
			y: distance * Math.sin(angle) + height / 2,
		};
	if (Math.abs(angle - Math.PI * 0.75) < angleThreshold)
		//southwest
		return { x: distance * Math.cos(angle) - width, y: distance * Math.sin(angle) + height / 2 };
	if (Math.abs(angle - Math.PI) < angleThreshold)
		//west
		return { x: distance * Math.cos(angle) - width, y: distance * Math.sin(angle) };
	if (Math.abs(angle - Math.PI * 1.25) < angleThreshold)
		//northwest
		return { x: distance * Math.cos(angle) - width, y: distance * Math.sin(angle) };
	if (Math.abs(angle - Math.PI * 1.5) < angleThreshold)
		//north
		return {
			x: distance * Math.cos(angle) - width / 2,
			y: distance * Math.sin(angle),
		};
	if (Math.abs(angle - Math.PI * 1.75) < angleThreshold)
		//northeat
		return { x: distance * Math.cos(angle), y: distance * Math.sin(angle) };
	return { x: distance * Math.cos(angle), y: distance * Math.sin(angle) };
};

export default getLabelOffsetAtAngle;
