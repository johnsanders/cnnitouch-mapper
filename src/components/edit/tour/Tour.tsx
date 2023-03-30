import ReactJoyride, { ACTIONS, CallBackProps, EVENTS, STATUS } from 'react-joyride';
import { Button } from '@mui/material';
import { EditAction } from '../types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faCircleInfo } from '@fortawesome/pro-solid-svg-icons';
import stepCallbacks from './stepCallbacks';
import steps from './steps';

interface Props {
	buttonStyle: React.CSSProperties;
	dispatch: React.Dispatch<EditAction>;
}

const Tour: React.FC<Props> = (props: Props) => {
	const [run, setRun] = React.useState(false);
	const [stepIndex, setStepIndex] = React.useState(0);
	const handleJoyrideCallback = async (data: CallBackProps) => {
		if (!steps) throw new Error('Steps are not defined');
		if (data.status === STATUS.FINISHED || data.action === ACTIONS.CLOSE) {
			setRun(false);
			setStepIndex(0);
		} else if (data.type === EVENTS.STEP_AFTER) {
			const nextStepIndex = data.index + (data.action === ACTIONS.PREV ? -1 : 1);
			const nextStep = steps[nextStepIndex];
			const stepCallback = stepCallbacks.find((callback) => callback.name === nextStep?.title);
			if (stepCallback) await stepCallback.fn(props.dispatch);
			setStepIndex(nextStepIndex);
		}
	};
	return (
		<>
			<Button
				color="secondary"
				onClick={() => setRun(true)}
				size="small"
				startIcon={<Icon icon={faCircleInfo} />}
				sx={props.buttonStyle}
				variant="contained"
			>
				How to use
			</Button>
			<ReactJoyride
				callback={handleJoyrideCallback}
				continuous
				run={run}
				scrollToFirstStep
				showProgress
				showSkipButton
				stepIndex={stepIndex}
				steps={steps}
				styles={{
					options: { primaryColor: '#007bff' },
				}}
			/>
		</>
	);
};

export default Tour;
