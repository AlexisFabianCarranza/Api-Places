const helpers = require('./helpers');
const User = require('../models/User');
const validParams = ['email', 'name','password']


function create(req,res,next){
    let params = helpers.buildsParams(validParams, req.body);
    User.create(params)
        .then(user=>{
            req.user = user;
            next();
            //res.json(user);
        }).catch(error =>{
            res.status(422).json({
                error
            });
        })
}

function myPlaces(req,res){
    User.findOne({'_id': req.user.id}).then(user =>{
        user.places.then(places=>{
            res.json(places);
        })
    }).catch(err=>{
        res.json(err);
    })
}
/*function destroyAll(req,res){
    console.log("SE destruyo todo");
    User.remove({}).then(r=>res.json({}));
}*/

module.exports = {create , myPlaces}