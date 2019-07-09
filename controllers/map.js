const express = require('express');
const db = require('../models');
const methodOverride = require('method-override');
const router = express.Router();

router.get('/:cityId', function(req,res) {
    console.log(">>>>>>>>>>>>",req.params)
    db.city.findByPk(parseInt(req.params.cityId))
    .then(function(cityData) {
        db.location.findAll({
            where:{
        cityId: req.params.cityId
            }
        }).then(data=> {
            console.log(data)
            res.render('map/index', {locations:data, city:cityData});
        })
    });
   
});

module.exports = router;