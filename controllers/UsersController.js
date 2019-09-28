const helpers = require('./helpers');
const User = require('../models/User');
const validParams = ['email', 'name','password']

function create(req,res){
    let params = helpers.buildsParams(validParams, req.body);
    User.create(params)
        .then(user=>{
            res.json(user);
        }).catch(error =>{
            res.status(422).json({
                error
            });
        })
}

module.exports = {create}