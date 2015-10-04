/**
 * Created by juan on 25/09/2015.
 */
"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');



router.post('/',function(req, res, next){

    //cojo los datos del post
    var nombre = req.body.nombre;

    var email = req.body.email;

    var pass = req.body.pass;

    //crear un registro
    var usuario = new Usuario({nombre:nombre,email:email,pass:pass});
    //guardar la bbddd
    usuario.save(function(err, creado){
        if(err){
            console.log(err);
            return res.json({ok:false, error:err});
        }


    });
    res.send('respond with a resource');
});


module.exports = router;
