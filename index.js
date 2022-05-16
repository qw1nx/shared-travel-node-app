const express = require('express');
const expressConfig = require('./config/express');
const dbInit = require('./config/database');
const { body } = require('express-validator');
const {isLoggedIn, isAuthorMiddleware} = require("./services/utilService");

start();

async function start () {
    const app = express();

    expressConfig(app);
    await dbInit(app);

    const { home } = require('./controllers/home');
    const { details } = require('./controllers/details');
    const { notFound } = require('./controllers/notFound');
    const edit = require('./controllers/edit');
    const create = require('./controllers/create');
    const { allTrips } = require('./controllers/allTrips');
    const { join } = require('./controllers/join');
    const { deleteTrip } = require('./controllers/delete');

    const { loginGet, loginPost, registerGet, registerPost, logoutGet } = require('./controllers/auth')

    app.get('/', home);

    app.route('/create')
        .get(isLoggedIn(), create.get)
        .post(isLoggedIn(), create.post);

    app.get('/alltrips', allTrips);

    app.get('/details/:id', details);

    app.route('/edit/:id')
        .get(isAuthorMiddleware(), edit.get)
        .post(isAuthorMiddleware(), edit.post);

    app.get('/delete/:id', isAuthorMiddleware(), deleteTrip);

    app.route('/login')
        .get(loginGet)
        .post(loginPost);

    app.route('/register')
        .get(registerGet)
        .post(body('email')
                .isEmail().withMessage('Email isn\' in correct format'),
            body('password')
                .isLength({min: 3}).withMessage('Password must be at least 3 characters long'),
            body('repeatPass')
                .custom(async (value, {req}) => {
                    if (value != req.body.password) {
                        throw new Error('Password dont\' match!')
                    }
                }).withMessage('Passwords do not match'),
            registerPost);

    app.get('/join/:id', isLoggedIn(), join);

    app.get('/logout', isLoggedIn(), logoutGet);

    app.get('*', notFound);


    app.listen(3000, () => console.log('Server listeninig on port 3000'))
}
