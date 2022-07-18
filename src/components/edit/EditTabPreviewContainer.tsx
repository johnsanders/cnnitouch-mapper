import EditTabPreview from './EditTabPreview';
import { MapSettings } from '../../types';
import React from 'react';
import { SSE } from 'sse.js';

// const previewRenderUrl = 'http://loncnn-ziv1.turner.com:8081/renderPreviewFrames'
const previewRenderUrl = 'http://localhost:8081/renderPreviewFrames';

interface Props {
	active: boolean;
	mapSettings: MapSettings;
	onNext?: () => void;
	onPrevious?: () => void;
}

const EditTabPreviewContainer: React.FC<Props> = (props: Props) => {
	const [id, setId] = React.useState('');
	const [filenames, setFilenames] = React.useState<string[]>([]);
	const [rendering, setRendering] = React.useState(false);
	const [renderStatus, setRenderStatus] = React.useState('');
	const getPreview = () => {
		if (rendering) return;
		setRendering(true);
		setFilenames([]);
		const handleStateMessage = (message: MessageEvent) => {
			const data = JSON.parse(message.data);
			if (data.status) setRenderStatus(data.status);
			if (data.status === 'Render complete') {
				setId(data.id);
				setFilenames(data.filenames || []);
				setRenderStatus('');
				setRendering(false);
				source.removeEventListener('message', handleStateMessage);
			}
		};
		const { boundsEnd, boundsStart, ...restMapSettings } = props.mapSettings;
		const boundsStartString = boundsStart.toBBoxString();
		const boundsEndString = boundsEnd.toBBoxString();
		const settings = {
			...restMapSettings,
			boundsEnd: boundsEndString,
			boundsStart: boundsStartString,
			compHeight: 360,
			compWidth: 640,
			everyNthFrame: 29,
		};
		const payload = JSON.stringify(settings);
		const source = new SSE(previewRenderUrl, {
			headers: { 'Content-Type': 'application/json' },
			payload,
		});
		source.addEventListener('message', handleStateMessage);
		source.stream();
	};
	return !props.active ? null : (
		<EditTabPreview
			filenames={filenames}
			getPreview={getPreview}
			id={id}
			onNext={props.onNext}
			onPrevious={props.onPrevious}
			renderStatus={renderStatus}
			rendering={rendering}
		/>
	);
};

export default EditTabPreviewContainer;
