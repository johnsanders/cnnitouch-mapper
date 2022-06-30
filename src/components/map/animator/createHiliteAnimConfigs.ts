import { Hilite, HiliteAnimationConfig } from '../types';
import getDomId from '../../../misc/getDomId';

const createHiliteAnimConfigs = (
	hilites: Hilite[],
	zoomDuration: number,
): HiliteAnimationConfig[] =>
	hilites.map((hilite) => {
		const element = document.querySelector(`.${getDomId('hilite', hilite.id)}`) as SVGPathElement;
		if (!(element?.nodeName === 'path')) throw new Error(`Cannot get hilite element ${hilite.id}`);
		return { element, endFrame: zoomDuration + 10, id: hilite.id, name: hilite.name };
	});

export default createHiliteAnimConfigs;
