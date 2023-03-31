import { EditAction, EditSettings } from './types';
import { LatLngBounds, Map as LeafletMap } from 'leaflet';
import EditMap from './EditMap';
import React from 'react';

const mapStartTabNames = ['boundsStart'];
const mapEndTabNames = ['banner', 'hilites', 'boundsEnd', 'labels', 'preview', 'render'];

interface Props {
	dispatch: React.Dispatch<EditAction>;
	state: EditSettings;
}

const EditMapContainer: React.FC<Props> = (props) => {
	const mapRef = React.useRef<LeafletMap>(null);
	const didInitMapRef = React.useRef(false);
	const prevActiveTabRef = React.useRef(props.state.activeTab);
	const boundsEndHasBeenManuallySetRef = React.useRef(false);
	const [hilitesAreHidden, setHilitesAreHidden] = React.useState(false);
	const [labelsAreHidden, setLabelsAreHidden] = React.useState(false);
	const {
		dispatch,
		state: {
			activeTab,
			mapSettings: { boundsEnd, boundsStart },
		},
	} = props;
	const handleBoundsChange = (bounds: LatLngBounds) => {
		if (props.state.activeTab === 'boundsStart') {
			props.dispatch({ key: 'boundsStart', value: bounds });
			if (!boundsEndHasBeenManuallySetRef.current)
				props.dispatch({ key: 'boundsEnd', value: bounds });
		} else if (props.state.activeTab === 'boundsEnd') {
			props.dispatch({ key: 'boundsEnd', value: bounds });
			boundsEndHasBeenManuallySetRef.current = true;
		}
	};
	React.useEffect(() => {
		if (didInitMapRef.current) return;
		const initMap = () => {
			if (mapRef.current) {
				dispatch({ key: 'boundsStart', value: mapRef.current.getBounds() });
				dispatch({ key: 'boundsEnd', value: mapRef.current.getBounds() });
			} else setTimeout(initMap, 1000);
		};
		initMap();
	}, [dispatch]);
	React.useEffect(() => {
		if (!mapRef.current) return;
		const currentMapBounds = mapRef.current.getBounds();
		if (activeTab === prevActiveTabRef.current) return;
		prevActiveTabRef.current = activeTab;
		if (mapStartTabNames.includes(activeTab) && !currentMapBounds.equals(boundsStart))
			mapRef.current.fitBounds(boundsStart);
		else if (mapEndTabNames.includes(activeTab) && !currentMapBounds.equals(boundsEnd))
			mapRef.current.fitBounds(boundsEnd);
	}, [activeTab, boundsEnd, boundsStart, dispatch]);
	return (
		<EditMap
			dispatch={props.dispatch}
			handleBoundsChange={handleBoundsChange}
			hilitesAreHidden={hilitesAreHidden}
			labelsAreHidden={labelsAreHidden}
			mapRef={mapRef}
			setHilitesAreHidden={setHilitesAreHidden}
			setLabelsAreHidden={setLabelsAreHidden}
			state={props.state}
		/>
	);
};

export default EditMapContainer;
