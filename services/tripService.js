const Post = require('../models/Trip');
const User = require('../models/User');
const { postViewModel } = require('../services/utilService')

async function getAll(){
    const posts = await Post.find();
    return posts.map(postViewModel);
}

async function findById(id){
    const post = await Post.findById(id);
    if (post) {
        return postViewModel(post);
    } else {
        return undefined;
    }
}

async function createPost(post){
    const input = postViewModel(post);
    await Post.create(input);
}

async function deleteById(id){
    await Post.findByIdAndDelete(id);
}

async function updateById(id, post, authorId) {
    const instance = await Post.findById(id);

    if (instance.author != authorId){
        return false;
    }

        instance.id = post._id;
        instance.startingPoint = post.startingPoint;
        instance.endPoint = post.endPoint;
        instance.date = post.date;
        instance.time = post.time;
        instance.carImage = post.carImage;
        instance.carBrand = post.carBrand;
        instance.seats = post.seats;
        instance.price = post.price;
        instance.description = post.description;

    await instance.save();
}

async function joinTrip(id, passangerId){
    const post = await Post.findById(id);
    post.buddies.push(passangerId);
    if(post.seats > 0){
        post.seats -= 1;
    }
    await post.save();
}

async function getAllPostsByAuthor(authorId){
    const posts = await Post.find({author: authorId});
    return posts.map(postViewModel);
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        findById,
        createPost,
        deleteById,
        updateById,
        getAllPostsByAuthor,
        joinTrip
    };
    next();
}