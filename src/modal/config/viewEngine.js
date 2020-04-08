import express from 'express';
import ejsLayout from 'express-ejs-extend';

let configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.engine('ejs', ejsLayout);
    app.set('view engine','ejs')
    app.set('views', './src/views');
}

module.exports = configViewEngine;