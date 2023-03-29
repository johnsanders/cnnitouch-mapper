import { Box } from '@mui/material';
import React from 'react';
import { Step } from 'react-joyride';

const stepBase = {
	disableBeacon: true,
	showSkipButton: false,
	spotlightClicks: true,
	styles: {
		options: {
			zIndex: 10000,
		},
	},
};

const getSteps = (): Step[] => [
	{
		...stepBase,
		content: (
			<>
				<Box mb={1}>
					The Mapper lets you create a simple zooming map animation, rendered to MediaSource.
				</Box>
				<Box mb={1}>
					You get to pick where your map starts and ends, as well as add highlights and place
					labels.
				</Box>
				<Box>Let&apos;s take a look!</Box>
			</>
		),
		placement: 'center',
		showSkipButton: false,
		styles: {
			options: {
				width: '50em',
				zIndex: 10000,
			},
		},
		target: 'body',
		title: 'Mapper Intro',
	},
	{
		...stepBase,
		content: (
			<>
				<Box mb={1}>
					You&apos;ll use this to choose the view where your map will start and where it will zoom
					into.
				</Box>
				<Box mb={1}>
					It moves and zooms just like a Google map. Go ahead and try it now if you want.
				</Box>
			</>
		),
		placement: 'top',
		styles: {
			options: {
				zIndex: 10000,
			},
		},
		target: '#mapContainer',
		title: 'The map',
	},
	{
		...stepBase,
		content: <Box mb={1}>You can zoom by scrolling, or you can use these buttons.</Box>,
		placement: 'top',
		styles: {
			options: {
				zIndex: 10000,
			},
		},
		target: '.leaflet-control-zoom',
		title: 'Zooming',
	},
	{
		...stepBase,
		content: (
			<>
				<Box mb={1}>These tabs will guide you through the steps of creating your map.</Box>
				<Box>
					The &quot;NEXT&quot; button will move you along, but you can jump around by clicking the
					tabs if you want.
				</Box>
			</>
		),
		placement: 'top',
		styles: {
			options: {
				zIndex: 10000,
			},
		},
		target: '#editTabs',
		title: 'The steps',
	},
	{
		...stepBase,
		content: (
			<>
				<Box mb={1}>We&apos;ll start by creating the banner.</Box>
				<Box mb={1}>
					Just type the text you want for the banner and sub-banner, or leave it blank if you
					don&apos;t want it.
				</Box>
				<Box>You&apos;ll see the banner appear on the map above and update as you type.</Box>
			</>
		),
		placement: 'top',
		styles: {
			options: {
				zIndex: 10000,
			},
		},
		target: '#editTabBanner',
		title: 'The Banner',
	},
	{
		...stepBase,
		content: (
			<>
				<Box mb={1}>
					Search for a country and click its name in the dropdown to add a highlight.
				</Box>
				<Box mb={1}>
					After you add a country, you&apos;ll see options below for adding the country name as a
					label on the map.
				</Box>
				<Box mb={1}>
					If your label appears faded out, it means it won&apos;t appear in this part of the
					animation, but will fade in as the map zooms in.
				</Box>
			</>
		),
		disableOverlay: true,
		placement: 'top-end',
		styles: {
			options: {
				zIndex: 10000,
			},
		},
		target: '#editTabHilites',
		title: 'Highlights',
	},
];

export default getSteps;
