import './styles/style.css';
import { Route, Routes, useParams } from 'react-router-dom';
// import DisplayContainer from './components/DisplayContainer';
import EditContainer from './components_old/EditContainer';
// import IndexContainer from './components/IndexContainer';
import Loading from './misc/Loading';
import MapContainerEl from './components_old/MapContainer';
import React from 'react';
import SvgFiltersDefs from './img/SvgFiltersDefs';
import { createRoot } from 'react-dom/client';
// import googleApiKey from './config/googleApiKey.json';

const Index: React.FC = (): JSX.Element => {
	// const { id } = useParams<{ id: string }>();
	const id = '1';
	const [googleLoaded, setGoogleLoaded] = React.useState(false);
	React.useEffect(() => {
		/*
		const onGoogleLoaded = () => {
			googleTag.removeEventListener('load', onGoogleLoaded);
			setGoogleLoaded(true);
		};
		const googleTag = document.createElement('script');
		googleTag.type = 'text/javascript';
		googleTag.src =
			'https://maps.googleapis.com/maps/api/js?key=' + googleApiKey.key + '&libraries=places';
		document.body.appendChild(googleTag);
		googleTag.addEventListener('load', onGoogleLoaded);
		*/
	}, []);
	return <MapContainerEl />;
	return !googleLoaded ? (
		<Loading />
	) : (
		<>
			<SvgFiltersDefs />
			<Routes>
				<Route element={<EditContainer mapId={id} />} path="/edit/:id?" />
				{/*
				<Route
					exact={true}
					path="/"
					render={(props): JSX.Element => <IndexContainer {...props} />}
				/>
				<Route
					exact={true}
					path="/display"
					render={(props): JSX.Element => <DisplayContainer {...props} />}
				/>
				*/}
			</Routes>
		</>
	);
};

const el = document.getElementById('app');
if (!el) throw new Error('Cannot find app div');
const root = createRoot(el);
root.render(<Index />);
