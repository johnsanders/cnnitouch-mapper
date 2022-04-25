import { Box, Grid } from '@mui/material';
import React from 'react';

interface Props {
	active: boolean;
}

const EditTabRender: React.FC<Props> = (props: Props) =>
	!props.active ? null : (
		<Grid item={true} md={6} sm={8} xs={12}>
			<Box mb={2} textAlign="center">
				Render info
			</Box>
		</Grid>
	);

export default EditTabRender;
