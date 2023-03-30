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
				<Box mb={1}>
					You&apos;ll use this to choose the view where your map will start and where it will zoom
					into.
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
				<Box mb={1}>These tabs will guide you through the steps of creating your map.</Box>
				<Box mb={1}>
					The &quot;NEXT&quot; button will move you along, but you can jump around by clicking the
					tabs if you want.
				</Box>
				<Box mb={1}>Let&apos;s take a quick look at some of the steps.</Box>
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
				<Box mb={1}>
					In the next two steps you will choose where you want your map to start and where you want
					it to zoom to.
				</Box>
				<Box mb={1}>Let&apos;s skip ahead to chooing your place labels.</Box>
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
				<Box mb={1}>Here you use the Google search to look up places you want to label.</Box>
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
