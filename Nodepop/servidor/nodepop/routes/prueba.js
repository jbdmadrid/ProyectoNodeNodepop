/**
 * Created by juan on 30/09/2015.
 */

var express = require('express');
var router = express.Router();
var i18n = require('../lib/i18n');
var s = express();

router.get('/',function(req, res, next){
    s.use(i18n);
    var s =res.__('hola');
    console.log(s);
    res.send('respond with a resource');
});

module.exports = router;