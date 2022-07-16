import { Hilite, Label } from '../types';

const getLabelsFromHilitesList = (hilites: Hilite[]) =>
	hilites.reduce<Label[]>((acc, hilite) => (hilite.label ? [...acc, hilite.label] : acc), []);

export default getLabelsFromHilitesList;
