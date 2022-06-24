import { MapSettings, RenderSettings } from '../map/types';
import { RenderAction, RenderState } from './types';
import { createPrecut, enqueueRender } from './enqueueRender';
import EditTabRender from './EditTabRender';
import React from 'react';

const initialState = {
	confirmText: '',
	email: '',
	errorText: '',
	loading: false,
	playback: { ATL: false, DC: false, NYH: false },
	slug: '',
	submitted: false,
};

const reducer: React.Reducer<RenderState, RenderAction | RenderAction[]> = (
	state,
	actionOrActions,
) => {
	const actions = Array.isArray(actionOrActions) ? actionOrActions : [actionOrActions];
	return actions.reduce((prev, action) => {
		if (
			action.key === 'playbackATL' ||
			action.key === 'playbackNYH' ||
			action.key === 'playbackDC'
		) {
			const playbackCode = action.key.replace('playback', '');
			const newPlayback = { ...prev.playback, [playbackCode]: action.value };
			return { ...prev, playback: newPlayback };
		}
		return { ...prev, [action.key]: action.value };
	}, state);
};

interface Props {
	active: boolean;
	onNext?: () => void;
	onPrevious?: () => void;
	mapSettings: MapSettings;
}

const EditTabRenderContainer: React.FC<Props> = (props: Props) => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	React.useEffect(() => {
		const savedEmail = window.localStorage.getItem('email');
		if (savedEmail) dispatch({ key: 'email', value: savedEmail });
	}, []);
	const { email, slug } = state;
	React.useEffect(() => dispatch({ key: 'errorText', value: '' }), [email, slug]);
	const handlePlaybackChange = (e: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
		const name = e.currentTarget.getAttribute('name');
		if (name === 'ATL' || name === 'NYH' || name === 'DC')
			dispatch({ key: `playback${name}`, value });
	};
	const handleSubmit = async () => {
		if (slug.length < 4) {
			dispatch({ key: 'errorText', value: 'We need a more descriptive slug for Mediasource.' });
			return;
		}
		if (email === '') {
			dispatch({ key: 'errorText', value: "We need your email to let you know when it's ready." });
			return;
		}
		dispatch([
			{ key: 'submitted', value: true },
			{ key: 'loading', value: true },
		]);
		const renderData: RenderSettings = {
			...props.mapSettings,
			boundsEnd: props.mapSettings.boundsEnd.toBBoxString(),
			boundsStart: props.mapSettings.boundsStart.toBBoxString(),
			mode: 'render',
		};
		window.localStorage.setItem('email', email);
		try {
			const msNumber = await createPrecut(slug);
			await enqueueRender(renderData, msNumber, slug, email, '');
			dispatch([
				{ key: 'loading', value: false },
				{
					key: 'confirmText',
					value: `Success! Your Mediasource number will be ${msNumber}. We'll email you in a few minutes when it's ready.`,
				},
			]);
		} catch (e) {
			dispatch([
				{ key: 'errorText', value: 'Failed to enqueue render.' },
				{ key: 'loading', value: false },
			]);
			console.log(e);
		}
	};
	return (
		<EditTabRender
			active={props.active}
			dispatch={dispatch}
			handlePlaybackChange={handlePlaybackChange}
			handleSubmit={handleSubmit}
			onPrevious={props.onPrevious}
			state={state}
		/>
	);
};

export default EditTabRenderContainer;
