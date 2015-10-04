/**
 * Created by juan on 02/10/2015.
 */
var express = require('express');
var i18n = require("i18n");

i18n.configure({
    locales:['en'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    directory: './locale',
});

module.exports = function(req, res, next) {

    i18n.init(req, res);
    res.local('__', res.__);

    var current_locale = i18n.getLocale();

    return next();
};