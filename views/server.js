require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const port = process.env.PORT || 3001;
const app = express();

const mapbox = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mapbox({
    accessToken: process.env.MAPBOX_PUBLIC_KEY
})

app.set('view engine', 'ejs');
app.use(layouts);
app.set('layout extractScripts', true);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));


app.get('/', function(req,res) {
    geocodingClient.forwardGeocode({
        query: "Seattle Washington " + location
    }).send().then(function(response) {
        let results = response.body.features.map(function(feature) {
            return feature.center
        })
        // res.render('map', {results})
        res.json(results)
     })
    
})
