const express = require('express');
const db = require('../models');
const methodOverride = require('method-override');
const router = express.Router();

router.get('/newcity',  function (req, res) {
    /*res.status(200).json({
        message: 'new city works'

    })*/    
    res.render('city/newcity');
});

router.post('/newcity', function(req,res) {
    db.city.create({
       name: req.body.name, 
       tagLine: req.body.tagLine
    }).then(function(data) {
        res.redirect('/city/newcity');
        /*res.status(200).json({
            message: 'new city works'
        })*/
    })
});

router.get('/:id/edit', function(req,res) {
    db.city.findByPk(parseInt(req.params.id))
    .then(function(data) {
        res.render('./city/edit', {city:data});
    })
});
    


router.put('/city/:id', function(req,res) {
    db.location.update({
     name: req.body.name,
    tagLine: req.body.tagLine
    }, {
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/newcity' + req.params.id);
 
    })
    
 });


module.exports = router;