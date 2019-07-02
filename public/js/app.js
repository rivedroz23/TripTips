console.log('hello mapbox');
console.log(markerCoords)

mapboxgl.accessToken = 'pk.eyJ1Ijoicml2ZWRyb3oyMyIsImEiOiJjanhleTdvOTkwM2hhM3RvN3d1eDhwbWx5In0.NvMVM2quRBrxFO8ERJdQyQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: markerCoords[0],
    zoom: 9
})










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

