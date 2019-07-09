const express = require('express');
const db = require('../models');
const methodOverride = require('method-override');
const router = express.Router();


router.get('/', function(req,res) {
    db.city.findAll().then(function(data) {

        res.render('city/index', {city:data});
    }).catch(err=>{
        console.log(err)
        res.render('city/index', {})
    });
});

router.get('/newcity',  function (req, res) {
    res.render('city/newcity');
});

// Get /:id - show route - gets one city
router.get('/:id', function(req,res) {
    db.city.findByPk(parseInt(req.params.id))
    .then(function(data) {
        res.render('city/show', {city:data});
    });

})


router.post('/newcity', function(req,res) {
    db.city.create({
       name: req.body.name, 
       tagLine: req.body.tagLine
    }).then(function(data) {
        res.redirect('/city/newcity');
    })
});

router.get('/:id/edit', function(req,res) {
    db.city.findByPk(parseInt(req.params.id))
    .then(function(data) {
        res.render('city/edit', {city:data});
    })
});


router.delete('/:id', function(req,res) {
    db.city.destroy({
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/city/newcity');
    });  
 });
    

router.put('/:id', function(req,res) {
    db.city.update({
     name: req.body.name,
     tagLine: req.body.tagLine
    }, {
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/city/' + req.params.id);
 
    })
    
 });

 


module.exports = router;