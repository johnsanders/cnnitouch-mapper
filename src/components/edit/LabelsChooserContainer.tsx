import { Label } from '../map/types';
import LabelsChooser from './LabelsChooser';
import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import { v4 as uuid } from 'uuid';

interface Props {
	labels: Label[];
	setLabels: (labels: Label[]) => void;
}

const LabelsChooserContainer: React.FC<Props> = (props) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const { labels, setLabels } = props;
	React.useEffect(() => {
		if (!inputRef.current) throw new Error('Input ref is undefined');
		const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			const lat = place.geometry?.location?.lat();
			const lng = place.geometry?.location?.lng();
			const name = place.name;
			if (!lat || !lng || !name) throw new Error('Could not get place info');
			const label: Label = {
				angle: 0,
				iconType: 'redDot',
				id: uuid(),
				lat,
				lng,
				minZoom: 2,
				name,
				type: 'point',
			};
			setLabels([...labels, label]);
			if (inputRef.current) inputRef.current.value = '';
		});
	}, [labels, setLabels]);
	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		const idToDelete = e.currentTarget.dataset.id;
		if (!idToDelete) throw new Error('Cannot get id to delete');
		props.setLabels(props.labels.filter((label) => label.id !== idToDelete));
	};
	const handleIconChange = (e: SelectChangeEvent<string>) => {
		props.setLabels(
			props.labels.map((label) =>
				label.id === e.target.name ? ({ ...label, iconType: e.target.value } as Label) : label,
			),
		);
	};
	const handleLabelNameChange = (id: string, name: string) => {
		props.setLabels(props.labels.map((label) => (label.id === id ? { ...label, name } : label)));
	};
	const handleLabelPositionChange = (e: SelectChangeEvent<number>) => {
		props.setLabels(
			props.labels.map((label) =>
				label.id === e.target.name ? ({ ...label, angle: e.target.value } as Label) : label,
			),
		);
	};
	return (
		<LabelsChooser
			handleDelete={handleDelete}
			handleIconChange={handleIconChange}
			handleLabelNameChange={handleLabelNameChange}
			handleLabelPositionChange={handleLabelPositionChange}
			inputRef={inputRef}
			labels={props.labels}
			setLabels={setLabels}
		/>
	);
};

export default LabelsChooserContainer;
