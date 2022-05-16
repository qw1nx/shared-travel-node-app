module.exports = {
    get(req, res){
        res.render('trip-create');
    },
    async post(req, res){

        const post = {
            startingPoint: req.body.startingPoint,
            endPoint: req.body.endPoint,
            date: req.body.date,
            time: req.body.time,
            carImage: req.body.carImage,
            carBrand: req.body.carBrand,
            seats: req.body.seats,
            price: req.body.price,
            description: req.body.description,
            author: req.session.user.id,
            buddies: []
        }
        console.log(post);
        try{
            console.log(post);
            await req.storage.createPost(post);
            res.redirect('/');
        } catch (e){
            console.log(e);
            res.redirect('/');
        }
    }
}