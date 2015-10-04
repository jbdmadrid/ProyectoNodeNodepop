'use strict';

/**
 * API /users resource.
 * @module routes/apiv1/users
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var Tokens = require('../../models/Token');
var jwt = require('jsonwebtoken');
var config = require('../../local_config');
//en ingles
router.post('/authenticate/', function(req, res) {
        //cojo los campos del usuario
        var email = req.body.email;
        var pass = req.body.pass;
        var user = {email: email, pass: pass};
        var query = Usuario.findOne(user);
        var esAndroid = req.get('User-Agent').match(/Android/i);
        var esios = req.get('User-Agent').match(/iOS/i);
        //consulto si exite en la bbdd
        query.sort('email');
        query.exec(function (err, rows) {
            if (err) {
                return err;
                console.log(err);
            }
            //me autentifico*/
            var token = jwt.sign(user, config.jwt.secret, {
                expiresInMinutes: config.jwt.expiresInMinutes
            });
            res.json({
                ok: true,
                message: 'Enjoy your token!',
                token: token
            });

            //miro de que plataforma es
           if(esAndroid){
                var plataforma = "Android";
            }else if(esios){
                plataforma = "iOS";
            }else{
                plataforma = "Other";
            }
            //crear un registro
            var t = new Tokens({plataforma:plataforma,token:token});
            //guardo token bbdd de registro
            t.save(function(err, creado){
                if(err){
                    console.log(err);
                    return res.json({ok:false, error:err});
                }

            });


        });

    });

module.exports = router;
