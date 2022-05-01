import { Box, Grid, TextField } from '@mui/material';
import EditTabNavButtons from './EditTabNavButtons';
import React from 'react';

interface Props {
	active: boolean;
	bannerText: string;
	onNext?: () => void;
	onPrevious?: () => void;
	setBanner: (banner: string) => void;
	setSubhead: (subhead: string) => void;
	subheadText: string;
}

const EditTabBanner: React.FC<Props> = (props: Props) => {
	const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		props.setBanner(e.currentTarget.value);
	const handleSubheadChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		props.setSubhead(e.currentTarget.value);
	return !props.active ? null : (
		<Grid item={true} md={6} sm={8} xs={12}>
			<Box mb={2} textAlign="center">
				Add your banner and optional sub-banner.
			</Box>
			<Box mb={2} textAlign="center">
				Leave everything blank for no banner.
			</Box>
			<TextField
				fullWidth={true}
				label="Banner"
				onChange={handleBannerChange}
				sx={{ marginBottom: '10px' }}
				value={props.bannerText}
			/>
			<TextField
				fullWidth={true}
				label="Subbanner"
				onChange={handleSubheadChange}
				value={props.subheadText}
			/>
			<EditTabNavButtons onNext={props.onNext} onPrevious={props.onPrevious} />
		</Grid>
	);
};

export default EditTabBanner;
