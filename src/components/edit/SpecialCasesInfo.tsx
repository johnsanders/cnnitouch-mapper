import { Grid, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';

interface Props {
	names: string[];
}

const israelNames = ['Israel', 'Jerusalem'];
const kashmirNames = ['India', 'Pakistan'];

const israelLinks = {
	'Beer Sheva':
		'https://warnermedia.sharepoint.com/sites/CNNStylebook/Stylebook%20Wiki/Beer%20Sheva,%20Israel.aspx',
	Gaza: 'https://warnermedia.sharepoint.com/sites/CNNStylebook/Stylebook%20Wiki/Gaza.aspx',
	'Golan Heights':
		'https://warnermedia.sharepoint.com/sites/CNNStylebook/Stylebook%20Wiki/Golan%20Heights.aspx',
	Israel: 'https://warnermedia.sharepoint.com/sites/CNNStylebook/Stylebook%20Wiki/Israel.aspx',

	Jerusalem:
		'https://warnermedia.sharepoint.com/sites/CNNStylebook/Stylebook%20Wiki/Jerusalem.aspx',
	Palestine:
		'https://warnermedia.sharepoint.com/sites/CNNStylebook/Stylebook%20Wiki/Palestine.aspx',
	'Place Names':
		'https://warnermedia.sharepoint.com/sites/CNNStylebook/Stylebook%20Wiki/Arabic-%20People,%20places.aspx',
	'SheBaa Farms':
		'https://warnermedia.sharepoint.com/sites/CNNStylebook/Stylebook%20Wiki/Shebaa%20Farms.aspx',
	'Tel Aviv':
		'https://warnermedia.sharepoint.com/sites/CNNStylebook/Stylebook%20Wiki/Tel%20Aviv.aspx',
	'West Bank':
		'https://warnermedia.sharepoint.com/sites/CNNStylebook/Stylebook%20Wiki/West%20Bank.aspx',
};

const SpecialCasesInfo: React.FC<Props> = (props: Props) => {
	const theme = useTheme();
	return (
		<>
			{!props.names.some((hiliteName) => kashmirNames.includes(hiliteName)) ? null : (
				<Grid item={true} xs={12}>
					<Box color={theme.palette.warning.dark} mb={1} textAlign="center">
						<Icon icon={faExclamationTriangle} style={{ marginRight: '0.5em' }} />
						Your map includes Kashmir. Please be sure to follow the style guide&nbsp;
						<a
							href="https://warnermedia.sharepoint.com/sites/CNNStylebook/Stylebook%20Wiki/Kashmir.aspx"
							rel="noreferrer"
							target="_blank"
						>
							here
						</a>
						.
					</Box>
				</Grid>
			)}
			{!props.names.some((hiliteName) => israelNames.includes(hiliteName)) ? null : (
				<Grid item={true} xs={12}>
					<Box color={theme.palette.warning.dark} textAlign="center">
						<Icon icon={faExclamationTriangle} style={{ marginRight: '0.5em' }} />
						Your map includes Israel and the Palestinian territories. Be sure to follow the style
						guides.
					</Box>
					<Box fontSize="0.8em" mb={1} textAlign="center">
						{Object.entries(israelLinks).map(([name, link]) => (
							<>
								<a href={link} key={name} rel="noreferrer" target="_blank">
									{name}
								</a>
								&nbsp;
							</>
						))}
					</Box>
				</Grid>
			)}
		</>
	);
};

export default SpecialCasesInfo;
