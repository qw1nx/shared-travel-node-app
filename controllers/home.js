module.exports = {
    async home(req, res) {
        // const cars = await req.storage.getAll(req.query);
        res.render('home', {title: 'WildLife'});
    }
};