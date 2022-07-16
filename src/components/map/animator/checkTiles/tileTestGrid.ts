import { Bounds } from '../../../types';

const cellSize = 10;
const createGrid = (mapRect: DOMRect) => {
	const numColumns = Math.ceil(mapRect.width / cellSize);
	const numRows = Math.ceil(mapRect.height / cellSize);
	const grid = Array.from({ length: numColumns }, () =>
		Array.from({ length: numRows }, () => false),
	);
	return grid;
};
const intersects = (rect1: Bounds, rect2: Bounds) =>
	!(
		rect2.left > rect1.right ||
		rect2.right < rect1.left ||
		rect2.top > rect1.bottom ||
		rect2.bottom < rect1.top
	);

class TileTestGrid {
	private grid: boolean[][] | null = null;
	private mapRect: DOMRect | null = null;
	public reset() {
		const mapEl = document.getElementById('mapContainer');
		if (!mapEl) throw new Error('Cannot get map el');
		this.mapRect = mapEl.getBoundingClientRect();
		this.grid = createGrid(this.mapRect);
	}
	public tilesAreMissing() {
		if (!this.grid || !this.mapRect) throw new Error('grid or mapRect are missing');
		return this.grid.some((column) => column.some((cell) => !cell));
	}
	public set(testRect: DOMRect) {
		if (!this.grid || !this.mapRect) throw new Error('grid or mapRect are missing');
		const testLeft = testRect.left - this.mapRect.left;
		const testTop = testRect.top - this.mapRect.top;
		const testBounds = {
			bottom: testTop + testRect.height,
			left: testLeft,
			right: testLeft + testRect.width,
			top: testTop,
		};
		this.grid.forEach((column, x) =>
			column.forEach((cell, y, arr) => {
				if (cell) return;
				const cellLeft = x * cellSize;
				const cellTop = y * cellSize;
				const cellBounds = {
					bottom: cellTop + cellSize,
					left: cellLeft,
					right: cellLeft + cellSize,
					top: cellTop,
				};
				if (intersects(testBounds, cellBounds)) arr[y] = true;
			}),
		);
	}
}

export default new TileTestGrid();
