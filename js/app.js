console.log('hello mapbox');

mapboxgl.accessToken = 'pk.eyJ1Ijoicml2ZWRyb3oyMyIsImEiOiJjanhleTdvOTkwM2hhM3RvN3d1eDhwbWx5In0.NvMVM2quRBrxFO8ERJdQyQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: markerCoords[0],
    zoom: 9
})