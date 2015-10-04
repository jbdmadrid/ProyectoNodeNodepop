/**
 * Created by juan on 02/10/2015.
 */
"use strict";


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoskin = require('mongoskin');
var mongodb = require('mongodb');
var Productos = mongoose.model('Productos');

//Consultas en español
//busqueda por letra del nombre
router.get('/nombre/:name',function(req,res){
    //recojo la letra por donde empieza el producto
    var name = req.params.name;
    //busco ese objeto
    Productos.lista({nombre:{$regex:'^'+name}},function(err,lista){
        if(err){
            var error = "no hay ningun anuncio que empiece por esa letra";
            console.log(error);
            return res.json({ok:false, error:err});

        }
        //lo muestro por json
        res.json({ok:true, data:lista});
    });
});
//busqueda por venta
router.get('/ventas/:sale(venta|busqueda)',function(req,res){
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
            var error = "por el campo de busqueda no existe el anuncio";
            console.log(error);
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
            var error = "no hay nada con ese tag"
            console.log(error);
            return res.json({ok:false, error:err});

        }
        //muestro
        res.json({ok:true, data:lista});
    });
});

//busqueda por rango
router.get('/precio/:menos&:max',function(req,res){
    //cojo el precio min y max
    var menos = req.params.menos;
    var max = req.params.max;
    //hago la query
    Productos.lista({precio:{'$gte':menos,'$lte':max}},function(err,lista){
        if(err){
            var error = "no hay anuncios por el rango que has puesto";
            console.log(error);
            return res.json({ok:false, error:err});

        }
        //lo muestro
        res.json({ok:true, data:lista});
    });
});
module.exports = router;