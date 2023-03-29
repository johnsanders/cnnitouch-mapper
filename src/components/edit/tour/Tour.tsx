import ReactJoyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import { EditAction } from '../types';
import React from 'react';
import getSteps from './getSteps';
import stepCallbacks from './stepCallbacks';

interface Props {
	dispatch: React.Dispatch<EditAction>;
}

const Tour: React.FC<Props> = (props: Props) => {
	const [run, setRun] = React.useState(false);
	const [steps, setSteps] = React.useState<Step[]>();
	const [stepIndex, setStepIndex] = React.useState(0);
	const handleJoyrideCallback = async (data: CallBackProps) => {
		if (!steps) throw new Error('Steps are not defined');
		console.log(data);
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
	React.useEffect(() => setSteps(getSteps()), []);
	return !steps ? null : (
		<ReactJoyride
			callback={handleJoyrideCallback}
			continuous
			run={run}
			scrollToFirstStep
			showProgress
			showSkipButton
			stepIndex={stepIndex}
			steps={getSteps()}
			styles={{
				options: { primaryColor: '#007bff' },
			}}
		/>
	);
};

export default Tour;
