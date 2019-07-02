const express = require('express');
const db = require('../models');
const methodOverride = require('method-override');

const router = express.Router();

router.get('/newlocation',  function (req, res) {
    res.render('location/newlocation');
});

// GETS one location
router.get('/:id', function(req,res) {
    db.location.findByPk(parseInt(req.params.id))
    .then(function(data) {
        res.render('location/show', {location:data});
    });

})


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


router.get('/:id/edit', function(req,res) {
    db.location.findByPk(parseInt(req.params.id))
    .then(function(data) {
        res.render('./location/edit', {location:data});
    })
});

router.delete('/:id', function(req,res) {
    db.location.destroy({
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/location/newlocation');
    });  
 });


router.put('/:id', function(req,res) {
    db.location.update({
     name: req.body.name,
     headlineText: req.body.headlineText,
     coordinates: req.body.coordinates,
     cityId: req.body.cityId,
     headlineUrl: req.body.headlineUrl
    }, {
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/location/' + req.params.id);
 
    })
    
 });



module.exports = router;