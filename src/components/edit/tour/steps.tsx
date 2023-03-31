import { Box } from '@mui/material';
import React from 'react';
import { Step } from 'react-joyride';
import vidSrc from './tourExample.mp4';

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

const steps: Step[] = [
	{
		...stepBase,
		content: (
			<>
				<Box mb={1}>
					<video autoPlay={true} loop={true} muted={true} src={vidSrc} />
				</Box>
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
				<Box mb={1}>These tabs will guide you through the steps of creating your map.</Box>
				<Box mb={1}>
					The &quot;NEXT&quot; button will move you along, but you can jump around by clicking the
					tabs if you want.
				</Box>
				<Box mb={1}>
					In the first two tabs you&apos;ll decide the view your map starts from and where it zooms
					into.
				</Box>
				<Box mb={1}>Let&apos;s see how you&apos;ll do that.</Box>
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
				<Box mb={1}>
					The first two tabs will guide you through moving and zooming the map to select the view
					where your map will start and where it will zoom into.
				</Box>
				<Box mb={1}>It moves and zooms like a Google map.</Box>
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
		content: (
			<>
				<Box mb={1}>You can zoom by scrolling the mouse wheel, but that might be sluggish.</Box>
				<Box mb={1}>You can also zoom in and out by clicking these buttons.</Box>
				<Box mb={1}>Now let&apos;s look the next steps after you have set your map views.</Box>
			</>
		),
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
				<Box mb={1}>
					The optional banner appears at the top of the screen in the CNNI graphic style at the top
					of the screen.
				</Box>
				<Box mb={1}>
					Just type the text you want for the banner and sub-banner, or leave it blank if you
					don&apos;t want a banner.
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
					To highlight and label a country, search for it and click its name in the dropdown.
				</Box>
				<Box mb={1}>After you add a country, options appear below for customizing its label.</Box>
			</>
		),
		placement: 'top-end',
		styles: {
			options: {
				zIndex: 10000,
			},
		},
		target: '#editTabHilites',
		title: 'Highlights',
	},
	{
		...stepBase,
		content: (
			<>
				<Box mb={1}>
					To label places like cities or points of interest, use the search box and click your
					selected result.
				</Box>
				<Box mb={1}>
					When you select a place, it will appear on the map, and also in the label list below.
				</Box>
				<Box mb={1}>
					In the label list, you can change the type of icon and position of the label, as well as
					adjust the place name.
				</Box>
				<Box mb={1}>
					More important labels should be higher in the list. You can reorder by dragging the
					up/down arrow.
				</Box>
			</>
		),
		placement: 'top-start',
		styles: {
			options: {
				zIndex: 10000,
			},
		},
		target: '#editTabLabels',
		title: 'Labels',
	},
	{
		...stepBase,
		content: (
			<>
				<Box mb={1}>
					This optional step helps you preview what your finished render will look like.
				</Box>
				<Box mb={1}>
					This way, you can spot any problems with your map before you wait for it to render into
					MediaSource.
				</Box>
				<Box mb={1}>
					If you click the &quot;Get Preview&quot; button, the system will render several frames
					showing how the animation will progress.
				</Box>
				<Box mb={1}>
					It can take as long as 15 seconds for the renderer to start up and create the frames, so
					don&apos;t give up.
				</Box>
			</>
		),
		placement: 'top',
		styles: {
			options: {
				zIndex: 10000,
			},
		},
		target: '#editTabPreview',
		title: 'Preview',
	},
	{
		...stepBase,
		content: (
			<>
				<Box mb={1}>
					Finally, you recognize this one... same as other CNNI Touch render pages like Stillstring.
				</Box>
				<Box mb={1}>
					Just pop in your MS slug and email, pick your playback destinations and hit
					&quot;Render&quot;.
				</Box>
				<Box mb={1}>All done!</Box>
			</>
		),
		placement: 'top',
		styles: {
			options: {
				zIndex: 10000,
			},
		},
		target: '#editTabRender',
		title: 'Render',
	},
];

export default steps;
