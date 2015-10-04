/**
 * Created by juan on 01/10/2015.
 */
'use strict';

var db = require('mongodb');
var mongoose = require('mongoose');
var readLine = require('readline');
var async = require('async');

function IniciarBBDD() {

    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Are you sure you want to empty DB? (no) ', function(answer) {
        rl.close();
        if (answer.toLowerCase() === 'yes') {
            runInstallScript();
        } else {
            console.log('DB install aborted!');
            return process.exit(0);
        }
    });

};

function runInstallScript() {

    async.series([
        initAnuncios,
        initUsuarios
    ],function(err, results){
        if(err){
        console.error('Hubo un error: ', err);
        return process.exit(1);
    }
    return process.exit(0);
}
);

}

function initAnuncios(cb) {
    var Productos = mongoose.model('Productos');

    // elimino todos
    Productos.remove({}, function(err) {
        if (err) return cb(err);
        cb(null);
        //añado
        var anuncio = new Productos({nombre: "Bicicleta", venta:true, precio:10,foto:"/public/images/biciclta-strike.jpg",tags:"motor"});
        anuncio.save(function (err, productoCreado) {
            if (err) throw err;
            console.log('Agente ' + productoCreado.nombre + ' creado');
		});
        var anuncio2 = new Productos({nombre: "Peluche", venta:true, precio:70,foto:"/public/images/oso.jpg",tags:"lifestyle"});
        anuncio2.save(function (err, productoCreado) {
            if (err) throw err;
            console.log('Anuncio ' + productoCreado.nombre + ' creado');
        });
});

}

function initUsuarios(cb) {
    var Usuario = mongoose.model('Usuario');

   Usuario.remove({}, function(err) {
        if (err) return cb(err);
        cb(null);
       //añado
        var user = new Usuario({nombre: 'Smith', email:"hola@gmail.com", pass:"cobadonga"});
        user.save(function (err, agenteCreado) {
            if (err) throw err;
            console.log('Usuario ' + agenteCreado.name + ' creado');
		});
    })
}
IniciarBBDD();