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

/*function destroyAll(req,res){
    console.log("SE destruyo todo");
    User.remove({}).then(r=>res.json({}));
}*/

module.exports = {create}