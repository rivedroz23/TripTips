
const express = require('express');
//const db = require('../models');
//const methodOverride = require('method-override');
const router = express.Router();


router.get('/index',  function (req, res) {
    res.render('admin/index');
});

module.exports = router;