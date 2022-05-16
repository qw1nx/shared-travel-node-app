module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const post = await req.storage.findById(id);

        if(post.author != req.session.user.id){
            console.log('User is not author!');
            return res.redirect('/login');
        }

        if (post) {
            res.render('trip-edit', { post } );
        } else {
            res.redirect('404');
        }
    },
    async post(req, res) {
        const id = req.params.id;
        const post = {
            startingPoint: req.body.startingPoint,
            endPoint: req.body.endPoint,
            date: req.body.date,
            time: req.body.time,
            carImage: req.body.carImage,
            carBrand: req.body.carBrand,
            seats: req.body.seats,
            price: req.body.price,
            description: req.body.description
        };

        try {
            if (await req.storage.updateById(id, post, req.session.user.id)){
                res.redirect('/login');
            } else {
                res.redirect('/details/' + id);
            }


        } catch (err) {
            console.log(err);
            res.redirect('/404');
        }
    }
}