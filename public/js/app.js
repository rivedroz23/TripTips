    mapboxgl.accessToken = 'pk.eyJ1Ijoicml2ZWRyb3oyMyIsImEiOiJjanhleTdvOTkwM2hhM3RvN3d1eDhwbWx5In0.NvMVM2quRBrxFO8ERJdQyQ';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: markerCoords[0],
        zoom: 9
    })


    const geoJSON = {
        "type": "FeatureCollection",
        "features": markerCoords.map(function (coord) {
            let marker = {
                "type": "Feature",
                "properties": {
                    "iconsize": [60, 60]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": coord
                }
            }
            return marker
        })
    }

    geoJSON.features.forEach(function (feature) {
        new mapboxgl.Marker({ anchor: 'center' })
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

	/*map.on('load', function () {
		// Add a layer showing the places.
		map.addLayer({
		"id": "places",
		"type": "symbol",
		"source": {
		"type": "geojson",
		"data": {
		"type": "FeatureCollection",
		"features": [{
		"type": "Feature",
		"properties": {
		"description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
		"icon": "theatre"
		},
		"geometry": {
		"type": "Point",
		"coordinates": [-122.333997,47.601342]
		}
	}, {

		map.on('click', 'places', function (e) {
			var coordinates = e.features[0].geometry.coordinates.slice();
			var description = e.features[0].properties.description;
			 
			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}
			 
			new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(description)
			.addTo(map);
			});
			 
			// Change the cursor to a pointer when the mouse is over the places layer.
			map.on('mouseenter', 'places', function () {
			map.getCanvas().style.cursor = 'pointer';
			});
			 
			// Change it back to a pointer when it leaves.
			map.on('mouseleave', 'places', function () {
			map.getCanvas().style.cursor = '';
			});
			});*/

	


// console.log('hello mapbox');

// //Check your mother fucking city and then wrap markerCoords in an if statement
// //if seattle markerCoords have coordinates for Seattle, else they have for Tbilisi

// //setCity("San Francisco"); 

// function setCity(city) {
// 	if (city) {
// 		console.log("I am in setCity function yo", city);
// 		let markerCoords;
// 		if (city === "seattle") {
// 			console.log("I am always in here bro");
// 			markerCoords = [
// 				[-122.355507, 47.616512],
// 				[-122.410347, 47.655598],
// 				[-122.3355, 47.6077]
// 			]
// 		} else if (city === "tbilisi") {
// 			console.log("The value o city is " + city);
// 			console.log("Yo I should be working");
// 			markerCoords = [
// 				[41.870087, 43.735725]
// 			]
// 		}
// 		window.location.href = `/${city}map`
// /*
// 		mapboxgl.accessToken = 'pk.eyJ1Ijoicml2ZWRyb3oyMyIsImEiOiJjanhleTdvOTkwM2hhM3RvN3d1eDhwbWx5In0.NvMVM2quRBrxFO8ERJdQyQ';

// 		var map = new mapboxgl.Map({
// 			container: 'map',
// 			style: 'mapbox://styles/mapbox/streets-v11',
// 			center: markerCoords[0],
// 			zoom: 9
// 		})
		
		
// 		const geoJSON = {
// 			"type": "FeatureCollection",
// 			"features": markerCoords.map(function (coord) {
// 				let marker = {
// 					"type": "Feature",
// 					"properties": {
// 						"iconsize": [60, 60]
// 					},
// 					"geometry": {
// 						"type": "Point",
// 						"coordinates": coord
// 					}
// 				}
// 				return marker
// 			})
// 		}
		
// 		geoJSON.features.forEach(function (feature) {
// 			new mapboxgl.Marker({ anchor: 'center' })
// 				.setLngLat(feature.geometry.coordinates)
// 				.addTo(map)
// 		})
		
		
		
// 		map.on('load', function () {
// 			let layers = map.getStyle().layers;
// 			let labelLayerId;
// 			for (let i = 0; i < layers.length; i++) {
// 				if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
// 					labelLayerId = layers[i].id;
// 					break;
// 				}
// 			}
			
// 			map.addLayer({
// 				"id": "3d-buildings",
// 				"source": "composite",
// 				"source-layer": "building",
// 				"filter": ["==", "extrude", "true"],
// 				"type": "fill-extrusion",
// 				"minzoom": 12,
// 				"paint": {
// 					"fill-extrusion-color": "#009e60",
// 					"fill-extrusion-height": [
// 						"interpolate",
// 						["linear"],
// 						["zoom"],
// 						12,
// 						0,
// 						12.05,
// 						["get", "height"]
// 					],
// 					"fill-extrusion-base": [
// 						"interpolate",
// 						["linear"],
// 						["zoom"],
// 						12,
// 						0,
// 						12.05,
// 						["get", "min_height"]
// 					],
// 					"fill-extrusion-opacity": 0.6
// 				}
// 			}, labelLayerId)
// 		});		
// */
// 	} else {
// 		console.log("I am in setCity else statement yo");
// 	}
// }


// /*markerCoords = [
//     [-122.355507,47.616512],
//     [-122.410347,47.655598],
// 	[-122.3355,47.6077]
// ]
// */

// //console.log(markerCoords)
// /*
// mapboxgl.accessToken = 'pk.eyJ1Ijoicml2ZWRyb3oyMyIsImEiOiJjanhleTdvOTkwM2hhM3RvN3d1eDhwbWx5In0.NvMVM2quRBrxFO8ERJdQyQ';

// var map = new mapboxgl.Map({
// 	container: 'map',
// 	style: 'mapbox://styles/mapbox/streets-v11',
// 	center: markerCoords[0],
// 	zoom: 9
// })


// const geoJSON = {
// 	"type": "FeatureCollection",
// 	"features": markerCoords.map(function (coord) {
// 		let marker = {
// 			"type": "Feature",
// 			"properties": {
// 				"iconsize": [60, 60]
// 			},
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": coord
// 			}
// 		}
// 		return marker
// 	})
// }

// geoJSON.features.forEach(function (feature) {
// 	new mapboxgl.Marker({ anchor: 'center' })
// 		.setLngLat(feature.geometry.coordinates)
// 		.addTo(map)
// })



// map.on('load', function () {
// 	let layers = map.getStyle().layers;
// 	let labelLayerId;
// 	for (let i = 0; i < layers.length; i++) {
// 		if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
// 			labelLayerId = layers[i].id;
// 			break;
// 		}
// 	}
// 	map.addLayer({
// 		"id": "3d-buildings",
// 		"source": "composite",
// 		"source-layer": "building",
// 		"filter": ["==", "extrude", "true"],
// 		"type": "fill-extrusion",
// 		"minzoom": 12,
// 		"paint": {
// 			"fill-extrusion-color": "#009e60",
// 			"fill-extrusion-height": [
// 				"interpolate",
// 				["linear"],
// 				["zoom"],
// 				12,
// 				0,
// 				12.05,
// 				["get", "height"]
// 			],
// 			"fill-extrusion-base": [
// 				"interpolate",
// 				["linear"],
// 				["zoom"],
// 				12,
// 				0,
// 				12.05,
// 				["get", "min_height"]
// 			],
// 			"fill-extrusion-opacity": 0.6
// 		}
// 	}, labelLayerId)
// });






// */