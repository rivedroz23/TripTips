console.log('hello mapbox');
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










