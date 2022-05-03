export interface Label {
	angle: number;
	iconType: 'none' | 'redStar' | 'redDot';
	id: string;
	name: string;
	lat: number;
	lng: number;
	type: 'area' | 'point';
}
