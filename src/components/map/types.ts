export type Pos = [number, number];

export interface Hilite {
	name: string;
	type: string;
}

export interface Label {
	iconType: 'none' | 'redStar' | 'redDot';
	id: string;
	name: string;
	lat: number;
	lng: number;
	relativePosition: Pos;
	type: 'area' | 'point';
}
