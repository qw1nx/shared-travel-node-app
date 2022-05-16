const {validationResult} = require('express-validator');
module.exports = {
    loginGet(req, res){
        res.render('login', {title: 'Login'});
    },
    async loginPost(req, res){
        try{
            await req.auth.login(req.body.email, req.body.password);
            res.redirect('/');
        } catch(e){
            console.error(e.message)
            res.render('login', {msg: e.message});
        }
    },
    registerGet(req, res){
        res.render('register', { title: 'Register'});
    },
    async registerPost(req, res){
        const {errors} = validationResult(req);
        try{
            if(errors.length > 0){
                throw errors;
            }
            //console.log('TOVA E VSICHKO OT FORMATA ');
           // console.log(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
            await req.auth.register(req.body.email, req.body.password, req.body.gender);
            res.redirect('/');
        } catch (errors){
            console.error(errors);
            res.render('register', {title: 'Register', errors, data: { email: req.body.email }});
        }
    },
    logoutGet(req, res){
        req.auth.logout();
        res.redirect('/');
    }
}