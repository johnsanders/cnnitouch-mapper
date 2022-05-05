import { MapSettings, RenderSettings } from '../map/types';
import { createPrecut, enqueueRender } from './enqueueRender';
import EditTabRender from './EditTabRender';
import React from 'react';

interface Props {
	active: boolean;
	onNext?: () => void;
	onPrevious?: () => void;
	mapSettings: MapSettings;
}

const EditTabRenderContainer: React.FC<Props> = (props: Props) => {
	const [email, setEmail] = React.useState('');
	const [slug, setSlug] = React.useState('');
	const [submitted, setSubmitted] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [errorText, setErrorText] = React.useState('');
	const [confirmText, setConfirmText] = React.useState('');
	React.useEffect(() => {
		const savedEmail = window.localStorage.getItem('email');
		if (savedEmail) setEmail(savedEmail);
	}, []);
	React.useEffect(() => setErrorText(''), [email, slug]);
	const handleSubmit = async () => {
		if (slug.length < 4) {
			setErrorText('We need a more descriptive slug for Mediasource.');
			return;
		}
		if (email === '') {
			setErrorText("We need your email to let you know when it's ready.");
			return;
		}
		setSubmitted(true);
		setLoading(true);
		const renderData: RenderSettings = {
			...props.mapSettings,
			boundsEnd: props.mapSettings.boundsEnd.toBBoxString(),
			boundsStart: props.mapSettings.boundsStart.toBBoxString(),
			mode: 'render',
		};
		window.localStorage.setItem('email', email);
		console.log(JSON.stringify(renderData));
		return;
		try {
			const msNumber = await createPrecut(slug);
			await enqueueRender(renderData, msNumber, slug, email, '');
			setLoading(false);
			setConfirmText(
				`Success! Your Mediasource number will be ${msNumber}. We'll email you in a few minutes when it's ready.`,
			);
		} catch (e) {
			setErrorText('Failed to enqueue render.');
			setLoading(false);
			console.log(e);
		}
	};
	return (
		<EditTabRender
			active={props.active}
			confirmText={confirmText}
			email={email}
			errorText={errorText}
			handleSubmit={handleSubmit}
			loading={loading}
			onPrevious={props.onPrevious}
			setEmail={setEmail}
			setSlug={setSlug}
			slug={slug}
			submitted={submitted}
		/>
	);
};

export default EditTabRenderContainer;