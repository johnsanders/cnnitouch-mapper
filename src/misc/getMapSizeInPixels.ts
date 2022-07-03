const getMapSizeInPixels = () => {
	const mapRect = document.getElementById('mapContainer')?.getBoundingClientRect();
	if (!mapRect) throw new Error('Cannot get map container element');
	const mapPixels = mapRect.height * mapRect.width;
	return mapPixels;
};

export default getMapSizeInPixels;
