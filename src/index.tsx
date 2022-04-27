import './style.css';
import EditContainer from './components/edit/EditContainer';
import Loading from './misc/Loading';
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import googleApiKey from './config/googleApiKey_disableGit';
import injectScript from './misc/injectScript';
import theme from './config/theme';

const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;

const Index: React.FC = (): JSX.Element => {
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		const awaitInject = async () => {
			await injectScript(scriptUrl);
			setLoading(false);
		};
		awaitInject();
	}, []);
	return <ThemeProvider theme={theme}>{loading ? <Loading /> : <EditContainer />}</ThemeProvider>;
};

const el = document.getElementById('app');
if (!el) throw new Error('Cannot find app div');
const root = createRoot(el);
root.render(<Index />);
