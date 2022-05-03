const geoSearch = (query: string): Promise<google.maps.GeocoderResult[]> =>
	new Promise((resolve, reject) => {
		const geocoder = new google.maps.Geocoder();
		geocoder.geocode({ address: query }, (results, status) => {
			if (!results || status !== 'OK') reject('Failed to get geo');
			else resolve(results);
		});
	});

export default geoSearch;
