/**
 * Created by juan on 02/10/2015.
 */
"use strict";


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoskin = require('mongoskin');
var mongodb = require('mongodb');



var Tokens = mongoose.model('Token');
//token en español

router.put('/es/:t',function(req,res){

    var tok = req.params.t;

    var esAndroid = req.get('User-Agent').match(/Android/i);
    var esios = req.get('User-Agent').match(/iOS/i);

    if(esAndroid){
        var plataforma = "Android";
    }else if(esios){
        plataforma = "iOS";
    }else{
        plataforma = "Otros";
    }
    //crear un registro
    var toke = new Tokens({plataforma:plataforma,token:tok});

    toke.save(function(err, creado){
        if(err){
            var error = "no se ha guardado el token";
            console.log(error);
            return res.json({ok:false, error:err});
        }

    });
    res.send('funciona');
});
module.exports = router;