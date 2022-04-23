import { Box, CircularProgress } from '@mui/material';
import React from 'react';

interface Props {
	message?: string;
}

const Loading: React.FC<Props> = (props: Props): JSX.Element => (
	<Box alignItems="center" display="flex" height="70vh" justifyContent="center" width="100vw">
		<CircularProgress />
		{props.message ? (
			<span style={{ color: 'white', fontSize: '20px' }}>{props.message}</span>
		) : null}
	</Box>
);

export default Loading;
