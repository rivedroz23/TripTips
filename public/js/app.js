console.log('hello mapbox');
markerCoords = [
    [-122.355507,47.616512],
    [-122.410347,47.655598],
    [-122.3355,47.6077]
]


console.log(markerCoords)

mapboxgl.accessToken = 'pk.eyJ1Ijoicml2ZWRyb3oyMyIsImEiOiJjanhleTdvOTkwM2hhM3RvN3d1eDhwbWx5In0.NvMVM2quRBrxFO8ERJdQyQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: markerCoords[0],
    zoom: 9
})


const geoJSON = {
    "type": "FeatureCollection",
    "features": markerCoords.map( function(coord) {
        let marker = {
            "type": "Feature",
            "properties": {
                "iconsize": [60,60]
            },
            "geometry": {
                "type": "Point",
                "coordinates": coord
            }
        }
        return marker
    })
}

geoJSON.features.forEach( function(feature) {
    new mapboxgl.Marker({anchor: 'center'})
    .setLngLat(feature.geometry.coordinates)
    .addTo(map)
})



map.on('load', function () {
	let layers = map.getStyle().layers;
	let labelLayerId;
	for (let i = 0; i < layers.length; i++) {
		if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
			labelLayerId = layers[i].id;
			break;
		}
	}
	map.addLayer({
		"id": "3d-buildings",
		"source": "composite",
		"source-layer": "building",
		"filter": ["==", "extrude", "true"],
		"type": "fill-extrusion",
		"minzoom": 12,
		"paint": {
			"fill-extrusion-color": "#009e60",
			"fill-extrusion-height": [
				"interpolate",
				["linear"],
				["zoom"],
				12,
				0,
				12.05,
				["get", "height"]
			],
			"fill-extrusion-base": [
				"interpolate",
				["linear"],
				["zoom"],
				12,
				0,
				12.05,
				["get", "min_height"]
			],
			"fill-extrusion-opacity": 0.6
		}
	}, labelLayerId)
});






