"use strict";

var mongoose = require('mongoose');

//definir esquema agente

var productoSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});
//metodo estatico
productoSchema.statics.lista = function(criterios, callback){
    //uso .find() sin cb para que me de un objeto query sin ejecutar
    var query = Productos.find(criterios);

    query.sort('name');

    query.limit(10);

    query.exec(function(err,rows){
        if(err){
            return callback(err);
        }

        return callback(null, rows);
    });

};
//metodo de instancia
productoSchema.methods.get = function(idProducto, callback){
    console.log(this);
    return callback(null, this);
};

//exportar
var Productos = mongoose.model('Productos' , productoSchema);
module.exports = Productos;
