const express = require('express');
const db = require('../models');
const router = express.Router();

router.post('/newlocation', function(req,res) {
    // console.log('req', req.body);
    db.location.create({
       name: req.body.name, 
       headlineText: req.body.headlineText,
       coordinates: req.body.coordinates,
       cityId: req.body.cityId,
       headlineUrl: req.body.headlineUrl
    }).then(function(data) {
        res.redirect('/location/newlocation');
    })
});

router.get('/newlocation', (req, res) => {
    res.render('newlocation');
});


router.put('/newlocation/:id', function(req,res) {
    db.location.update({
     name: req.body.name,
     headlineText: req.body.headlineText,
     coordinates: req.body.coordinates,
     cityId: req.body.cityId,
     headlineUrl: req.body.headlineUrl
    }, {
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/newlocation' + req.params.id);
 
    })
    
 });

module.exports = router;