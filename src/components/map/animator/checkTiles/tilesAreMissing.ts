import tileTestGrid from './tileTestGrid';

const getContainersTilesInfo = (tileContainers: HTMLDivElement[]) =>
	tileContainers.map((container) => {
		const children = Array.from(container.children) as HTMLDivElement[];
		const childrenInfo = children.map((child) => {
			const dataPending = child.dataset.pending === '1';
			return { dataPending, rect: child.getBoundingClientRect() };
		});
		return childrenInfo;
	});
const tilesAreMissing = () => {
	const tileContainers = Array.from(
		document.querySelectorAll('.leaflet-tile-container'),
	) as HTMLDivElement[];
	const containersTilesInfo = getContainersTilesInfo(tileContainers);
	tileTestGrid.reset();
	containersTilesInfo.forEach((container) =>
		container.forEach((tile) => {
			if (!tile.dataPending) tileTestGrid.set(tile.rect);
		}),
	);
	return tileTestGrid.tilesAreMissing();
};

export default tilesAreMissing;
