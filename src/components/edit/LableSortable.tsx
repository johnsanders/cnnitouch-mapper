import { IconButton, SelectChangeEvent, TableCell, TableRow, Tooltip } from '@mui/material';
import { faTrash, faUpDown } from '@fortawesome/pro-solid-svg-icons';
import { CSS } from '@dnd-kit/utilities';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import InlineEdit from './InlineEdit';
import { Label } from '../types';
import LabelIconChooser from './LabelIconChooser';
import LabelPositionChooser from './LabelPositionChooser';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';

interface Props {
	handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleIconChange: (e: SelectChangeEvent<string>) => void;
	handleLabelNameChange: (id: string, value: string) => void;
	handleLabelPositionChange: (e: SelectChangeEvent<number>) => void;
	label: Label;
}

const LabelSortable: React.FC<Props> = (props) => {
	const { attributes, listeners, setActivatorNodeRef, setNodeRef, transform, transition } =
		useSortable({
			animateLayoutChanges: () => false,
			id: props.label.id,
		});
	return (
		<TableRow
			{...attributes}
			ref={setNodeRef}
			sx={{ backgroundColor: '#f8f8f8', transform: CSS.Transform.toString(transform), transition }}
		>
			<TableCell>
				<InlineEdit
					id={props.label.id}
					updateValue={props.handleLabelNameChange}
					value={props.label.name}
				/>
			</TableCell>
			<TableCell>
				<LabelIconChooser handleIconChange={props.handleIconChange} label={props.label} />
			</TableCell>
			<TableCell>
				<LabelPositionChooser
					handleLabelPositionChange={props.handleLabelPositionChange}
					label={props.label}
				/>
			</TableCell>
			<TableCell align="right">
				<Tooltip arrow={true} placement="top" title="Delete">
					<IconButton
						aria-label="delete"
						data-id={props.label.id}
						onClick={props.handleDelete}
						size="small"
						sx={{ marginRight: '1em' }}
					>
						<Icon icon={faTrash} />
					</IconButton>
				</Tooltip>
				<IconButton
					{...listeners}
					aria-label="delete"
					data-id={props.label.id}
					ref={setActivatorNodeRef}
					size="small"
					sx={{ cursor: 'ns-resize' }}
				>
					<Icon icon={faUpDown} />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default LabelSortable;
