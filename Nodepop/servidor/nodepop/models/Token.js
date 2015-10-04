/**
 * Created by juan on 30/09/2015.
 */

"use strict";

var mongoose = require('mongoose');

//definir esquema agente

var tokenSchema = mongoose.Schema({
    plataforma: String,
    token: String
});


//exportar
var Token = mongoose.model('Token' , tokenSchema);
module.exports = Token;
