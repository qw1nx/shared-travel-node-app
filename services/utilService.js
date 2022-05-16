const bcrypt = require('bcrypt');
const Post = require('../models/Trip');

function postViewModel(post){
    return {
        id: post._id,
        startingPoint: post.startingPoint,
        endPoint: post.endPoint,
        date: post.date,
        time: post.time,
        carImage: post.carImage,
        carBrand: post.carBrand,
        seats: post.seats,
        price: post.price,
        description: post.description,
        author: post.author,
        buddies: []
    }
}

async function hashPassword (password){
    return bcrypt.hash(password, 10);
}

async function comparePass (password, hashedPassword){
    return bcrypt.compare(password, hashedPassword);
}

function isLoggedIn(){
    return function(req, res, next){
        if (req.session.user){
            next();
        } else {
            res.redirect('/login')
        }
    }
}

function isAuthorMiddleware(){
    return async function(req, res, next){
        try{
            const post = await Post.findById(req.params.id);
            if (req.session.user.id == post.author){
                next();
            }
        } catch (e){
            console.log(e.message);
            res.redirect('/login');
        }
    }
}

module.exports = {
    postViewModel,
    hashPassword,
    comparePass,
    isLoggedIn,
    isAuthorMiddleware
}