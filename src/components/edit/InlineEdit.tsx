import { ClickAwayListener, IconButton, TextField, Tooltip } from '@mui/material';
import { faCheck, faEdit, faTimes } from '@fortawesome/pro-solid-svg-icons';
import { Box } from '@mui/system';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
	id: string;
	updateValue: (id: string, value: string) => void;
	value: string;
}

const InlineEdit: React.FC<Props> = (props: Props) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const undoRef = React.useRef('');
	const [active, setActive] = React.useState(false);
	React.useEffect(() => {
		if (inputRef.current && active) {
			inputRef.current.select();
		}
	}, [active]);
	const handleOpen = () => {
		undoRef.current = props.value;
		setActive(true);
	};
	const handleClose = () => {
		undoRef.current = '';
		setActive(false);
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		props.updateValue(props.id, e.currentTarget.value);
	const handleCancel = () => {
		props.updateValue(props.id, undoRef.current);
		handleClose();
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Escape') handleCancel();
		else if (e.code === 'Enter') handleClose();
	};
	return !active ? (
		<div>
			{props.value}
			<IconButton onClick={handleOpen} style={{ marginTop: '-0.2em' }}>
				<Icon className="fa-2xs" icon={faEdit} />
			</IconButton>
		</div>
	) : (
		<ClickAwayListener onClickAway={() => setActive(false)}>
			<Box display="flex">
				<TextField
					inputProps={{ maxLength: 30 }}
					inputRef={inputRef}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					size="small"
					value={props.value}
					variant="outlined"
				/>
				<Box display="flex" flexDirection="column" ml={1} textAlign="center">
					<Tooltip arrow={true} placement="top" title="Save">
						<IconButton color="success" onClick={handleClose} sx={{ margin: '1px', padding: 0 }}>
							<Icon className="fa-2xs" icon={faCheck} />
						</IconButton>
					</Tooltip>
					<Tooltip arrow={true} title="Cancel">
						<IconButton color="error" onClick={handleCancel} sx={{ margin: '1px', padding: 0 }}>
							<Icon className="fa-2xs" icon={faTimes} />
						</IconButton>
					</Tooltip>
				</Box>
			</Box>
		</ClickAwayListener>
	);
};

export default InlineEdit;
