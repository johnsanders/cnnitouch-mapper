export const hiliteStyle = (feature: any): any => {
	if (feature)
		return {
			color: '#000000',
			fillColor: '#ffaf38',
			fillOpacity: 1,
			weight: 1,
		};
};
export const borderStyle = (feature: any): any => {
	if (feature)
		return {
			color: '#d4e2b0',
			weight: 1,
		};
};
