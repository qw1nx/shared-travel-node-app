module.exports = {
    async join(req, res){
        const id = req.params.id;
            try{
                await req.storage.joinTrip(id, req.session.user.id);
                res.redirect('/details/' + id);
            } catch (e){
                console.log(e.message)
                res.redirect('/details/' + id)
            }

    }
}