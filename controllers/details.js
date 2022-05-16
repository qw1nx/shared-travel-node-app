module.exports = {
    async details(req, res) {
        const id = req.params.id;
        const post = await req.storage.findById(id);

        if (req.session.user && req.session.user.id == post.author){
            post.isAuthor = true;
        }



        if (req.session.user && post.buddies.includes(req.session.user.id)){
            console.log('got in HAS JOINED')
            post.hasJoined = true;
        }

        // if(post.buddies.length > 0) {
        //     await post.buddies.forEach( async function (e) {
        //         post.buddiesEmails.push(await req.auth.getUserEmailById(e));
        //     })
        // }

        post.authorEmail = await req.auth.getUserEmailById(post.author);

        console.log(post);

        if (post) {
            res.render('trip-details', {post});
        } else {
            res.redirect('/404');
        }
    }
};