import './styles/style.css';
import 'leaflet/dist/leaflet.css';
import Edit from './components/Edit';
import React from 'react';
import { createRoot } from 'react-dom/client';

const Index: React.FC = (): JSX.Element => {
	return <Edit />;
};

const el = document.getElementById('app');
if (!el) throw new Error('Cannot find app div');
const root = createRoot(el);
root.render(<Index />);
