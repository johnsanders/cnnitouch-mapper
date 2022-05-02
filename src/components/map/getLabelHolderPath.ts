const paddingX = 8;
const paddingY = -3;
const pointerSize = 15;

const angleThreshold = 0.125;

const getLabelHolderPath = (angle: number, x: number, y: number, width: number, height: number) => {
	if (angle < Math.PI * 0.125 || angle > Math.PI * 1.875)
		// east
		return `
			M 0,0
			L ${x - paddingX},${y + height / 2 - pointerSize / 2}
			L ${x - paddingX},${y - paddingY}
			L ${x + width + paddingX},${y - paddingY}
			L ${x + width + paddingX},${y + height + paddingY}
			L ${x - paddingX},${y + height + paddingY}
			L ${x - paddingX},${y + height / 2 + pointerSize / 2}
			Z
	`;
	if (Math.abs(angle - Math.PI * 0.25) < angleThreshold) {
		// southeast
		return `
			M 0,0
			L ${x - paddingX + pointerSize},${y - paddingY}
			L ${x + width + paddingX},${y - paddingY}
			L ${x + width + paddingX},${y + height + paddingY}
			L ${x - paddingX},${y + height + paddingY}
			L ${x - paddingX},${y - paddingY + pointerSize}
			Z
	`;
	}
	if (Math.abs(angle - Math.PI * 0.5) < angleThreshold)
		// south
		return `
			M 0,0
			L ${x + width / 2 + pointerSize},${y - paddingY}
			L ${x + width + paddingX},${y - paddingY}
			L ${x + width + paddingX},${y + height + paddingY}
			L ${x - paddingX},${y + height + paddingY}
			L ${x - paddingX},${y - paddingY}
			L ${x + width / 2 - pointerSize},${y - paddingY}
			Z
	`;
	if (Math.abs(angle - Math.PI * 0.75) < angleThreshold)
		//southwest
		return `
			M 0,0
			L ${x + width + paddingX},${y - paddingY + pointerSize}
			L ${x + width + paddingX},${y + height + paddingY}
			L ${x - paddingX},${y + height + paddingY}
			L ${x - paddingX},${y - paddingY}
			L ${x - paddingX + width - pointerSize},${y - paddingY}
			Z
		`;
	if (Math.abs(angle - Math.PI) < angleThreshold)
		//west
		return `
			M 0,0
			L ${x + width + paddingX},${y + height / 2 + pointerSize / 2}
			L ${x + width + paddingX},${y + height + paddingY}
			L ${x - paddingX},${y + height + paddingY}
			L ${x - paddingX},${y - paddingY}
			L ${x + width + paddingX},${y - paddingY}
			L ${x + width + paddingX},${y + height / 2 - pointerSize / 2}
			Z
		`;
	if (Math.abs(angle - Math.PI * 1.25) < angleThreshold)
		//northwest
		return `
			M 0,0
			L ${x + width + paddingX - pointerSize},${y + height + paddingY}
			L ${x - paddingX},${y + height + paddingY}
			L ${x - paddingX},${y - paddingY}
			L ${x + width + paddingX},${y - paddingY}
			L ${x + width + paddingX},${y + height + paddingY - pointerSize}
			Z
	`;
	if (Math.abs(angle - Math.PI * 1.5) < angleThreshold)
		//north
		return `
			M 0,0
			L ${x + width / 2 - pointerSize},${y + height + paddingY}
			L ${x - paddingX},${y + height + paddingY}
			L ${x - paddingX},${y - paddingY}
			L ${x + width + paddingX},${y - paddingY}
			L ${x + width + paddingX},${y + height + paddingY}
			L ${x + width / 2 + pointerSize},${y + height + paddingY}
			Z
	`;
	if (Math.abs(angle - Math.PI * 1.75) < angleThreshold)
		//northeast
		return `
			M 0,0
			L ${x - paddingX},${y + height + paddingY - pointerSize}
			L ${x - paddingX},${y - paddingY}
			L ${x + width + paddingX},${y - paddingY}
			L ${x + width + paddingX},${y + height + paddingY}
			L ${x - paddingX + pointerSize},${y + height + paddingY}
			Z
	`;
	return '';
};

export default getLabelHolderPath;
