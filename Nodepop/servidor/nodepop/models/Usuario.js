/**
 * Created by juan on 25/09/2015.
 */
"use strict";

var mongoose = require('mongoose');

//definir esquema usuario

var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    pass: String
});

//exportar
var Usuario = mongoose.model('Usuario',usuarioSchema);
module.exports = Usuario;
