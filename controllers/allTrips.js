module.exports = {
    async allTrips(req, res){
        try{
            const trips = await req.storage.getAll();
            //console.log(posts);
            res.render('shared-trips', { trips, title: 'Shared trips' });
        } catch (e){
            console.log(e.message);
            res.redirect('/');
        }

    }
}