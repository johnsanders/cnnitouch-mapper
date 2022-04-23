import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons/faExclamationTriangle';

const Error: React.FC = (): JSX.Element => (
	<div
		style={{
			alignItems: 'center',
			display: 'flex',
			height: '100vh',
			justifyContent: 'center',
			width: '100vw',
		}}
	>
		<Icon className="fa-3x" icon={faExclamationTriangle} style={{ color: 'gray', top: '-1em' }} />
	</div>
);

export default Error;
