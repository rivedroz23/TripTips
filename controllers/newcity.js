const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/newcity', (req, res) => {
    /*res.status(200).json({
        message: 'new city works'
    })*/

    res.render('newcity');
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

module.exports = router;