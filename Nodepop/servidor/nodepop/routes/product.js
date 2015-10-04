"use strict";


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoskin = require('mongoskin');
var mongodb = require('mongodb');


var Productos = mongoose.model('Productos');
//var Productos = require('../models/Productos');

//Consultas en ingles
//busqueda por letra del nombre
router.get('/name/:name',function(req,res){
    //recojo la letra por donde empieza el producto
    var name = req.params.name;
    //busco ese objeto
    Productos.lista({nombre:{$regex:'^'+name}},function(err,lista){
        if(err){
            console.log(err);
            return res.json({ok:false, error:err});

        }
        //lo muestro por json
        res.json({ok:true, data:lista});
    });
});
//busqueda por venta
router.get('/sales/:sale(venta|busqueda)',function(req,res){
    //miro el producto que esta en venta o en busqueda
    var sale = req.params.sale;
    //Dependiendo de lo que es le asigno un booleano
    if(sale === "venta"){
        var venta = true;
    }else if(sale === "busqueda"){
         venta = false;
    }else{
        venta = false;
    }
    //hago la query
    Productos.lista({venta:venta},function(err,lista){
        if(err){
            console.log(err);
            return res.json({ok:false, error:err});

        }
        //muestro el resultado
        res.json({ok:true, data:lista});
    });
});
//busqueda por tags
//busco por tags
router.get('/tags/:sale',function(req,res){
    //recojo el tag
    var sale = req.params.sale;
    // la busco
    Productos.lista({tags:sale},function(err,lista){
        if(err){
            console.log(err);
            return res.json({ok:false, error:err});

        }
        //muestro
        res.json({ok:true, data:lista});
    });
});

//busqueda por rango
router.get('/price/:menos&:max',function(req,res){
    //cojo el precio min y max
    var menos = req.params.menos;
    var max = req.params.max;
    //hago la query
    Productos.lista({precio:{'$gte':menos,'$lte':max}},function(err,lista){
        if(err){
            console.log(err);
            return res.json({ok:false, error:err});

        }
        //lo muestro
        res.json({ok:true, data:lista});
    });
});


module.exports = router;