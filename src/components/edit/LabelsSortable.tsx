import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useDroppable,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { SelectChangeEvent, TableBody } from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Label } from '../types';
import LabelChooserItem from './LabelChooserItem';
import React from 'react';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

interface Props {
	handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
	handleIconChange: (e: SelectChangeEvent<string>) => void;
	handleLabelNameChange: (id: string, value: string) => void;
	handleLabelPositionChange: (e: SelectChangeEvent<number>) => void;
	labels: Label[];
	setLabels: (labels: Label[]) => void;
}

const LabelsSortable: React.FC<Props> = (props) => {
	const { setNodeRef } = useDroppable({ id: 'labels' });
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);
	const handleSortEnd = (e: DragEndEvent) => {
		const fromId = e.active.id;
		const toId = e?.over?.id;
		console.log(fromId, toId);
	};
	return (
		<DndContext
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis]}
			onDragEnd={handleSortEnd}
			sensors={sensors}
		>
			<SortableContext
				items={props.labels.map((label) => label.id)}
				strategy={verticalListSortingStrategy}
			>
				<TableBody ref={setNodeRef}>
					{props.labels.map((label) => (
						<LabelChooserItem
							handleDelete={props.handleDelete}
							handleIconChange={props.handleIconChange}
							handleLabelNameChange={props.handleLabelNameChange}
							handleLabelPositionChange={props.handleLabelPositionChange}
							key={label.id}
							label={label}
						/>
					))}
				</TableBody>
			</SortableContext>
		</DndContext>
	);
};

export default LabelsSortable;
