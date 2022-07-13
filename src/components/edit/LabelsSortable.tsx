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
import { SelectChangeEvent, Table, TableBody } from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Label } from '../types';
import LabelSortable from './LableSortable';
import React from 'react';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

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
		const fromIndex = props.labels.findIndex((label) => label.id === fromId);
		const toIndex = props.labels.findIndex((label) => label.id === toId);
		if (fromIndex !== -1 && toIndex !== -1) {
			const newLabels = arrayMove(props.labels, fromIndex, toIndex);
			props.setLabels(newLabels);
		}
	};
	return (
		<DndContext
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis]}
			onDragEnd={handleSortEnd}
			sensors={sensors}
		>
			<Table>
				<colgroup>
					<col style={{ width: '30%' }} />
					<col style={{ width: '25%' }} />
					<col style={{ width: '25%' }} />
					<col style={{ width: '20%' }} />
				</colgroup>
				<SortableContext
					items={props.labels.map((label) => label.id)}
					strategy={verticalListSortingStrategy}
				>
					<TableBody ref={setNodeRef}>
						{props.labels.map((label) => (
							<LabelSortable
								handleDelete={props.handleDelete}
								handleIconChange={props.handleIconChange}
								handleLabelNameChange={props.handleLabelNameChange}
								handleLabelPositionChange={props.handleLabelPositionChange}
								key={label.id}
								label={label}
								showDragHandle={props.labels.length > 1}
							/>
						))}
					</TableBody>
				</SortableContext>
			</Table>
		</DndContext>
	);
};

export default LabelsSortable;
