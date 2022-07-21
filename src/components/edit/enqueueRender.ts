import { MapSettingsInput } from '../../types';
import qs from 'qs';

export const createPrecut = async (slug: string): Promise<string> => {
	const params = {
		location: 'atlanta',
		slug,
		source: 'Google Earth',
		type: '10041',
		videoSource: 'Google Earth',
	};
	const query = qs.stringify(params);
	const res = await fetch(`http://cnnitouch-prod1.tbsbest.com:8081/bmam/createPrecut?${query}`);
	return res.text();
};

const pattern = /'/g;
const stripQuotes = (str: string): string => str.replace(pattern, '');
const lambdaEndpoint =
	'https://gs1rx7vpui.execute-api.eu-central-1.amazonaws.com/Prod/ServicesInterface';

export const enqueueRender = async (
	mapSettings: MapSettingsInput,
	msNumber: string,
	slug: string,
	email: string,
	playback: string,
) => {
	const body = {
		actionName: 'enqueueRender',
		data1: JSON.stringify(mapSettings),
		email: stripQuotes(email),
		msNumber,
		name: stripQuotes(slug),
		playback,
		type: 'map',
	};
	const res = await fetch(lambdaEndpoint, {
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
	});
	const resJson = await res.json();
	return resJson;
};

export const callRenderWebhook = async (): Promise<void> => {
	await fetch(
		'https://cnnitouch-prod1.tbsbest.com:8088/proxy?url=http://loncnn-ziv1.turner.com:8081/checkRenders',
	).catch((e) => console.log(e));
};
