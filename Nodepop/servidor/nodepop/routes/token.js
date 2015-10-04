"use strict";


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoskin = require('mongoskin');
var mongodb = require('mongodb');


var Tokens = require('../models/Token');

//token en ingles
router.put('/:t',function(req,res){

    //recojo el token
    var tok = req.params.t;
    //miro la plataforma
    var esAndroid = req.get('User-Agent').match(/Android/i);
    var esios = req.get('User-Agent').match(/iOS/i);

    if(esAndroid){
        var plataforma = "Android";
    }else if(esios){
        plataforma = "iOS";
    }else{
        plataforma = "Other";
    }
    //crear un registro
    var toke = new Tokens({plataforma:plataforma,token:tok});
    //guardar el token
    toke.save(function(err, creado){
        if(err){
            console.log(err);
            return res.json({ok:false, error:err});
        }

    });
    res.send('respond with a resource');
});

module.exports = router;
