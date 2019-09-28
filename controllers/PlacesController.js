const Place = require('../models/Place');
const upload = require('../config/upload');


function find(req,res,next){
  Place.findById(req.params.id)
    .then(place=>{
      req.place = place;
      next()
    }).catch(err=>{
      next(err);
    })
}

function index(req,res){
  //Todos los lugares
  Place.paginate({},{page: req.query.page || 1, limit: 8, sort:{'_id': -1}})
  .then(docs=>{
    res.json(docs);
  }).catch(err => {
    console.log(err);
    res.json(err);
  })
}

function show(req,res){
  //Busqueda individual
  res.json(req.place);
}

function create(req,res){
  //Crear nuevos lugares
  Place.create({
    title: req.body.title,
    description: req.body.description,
    accepsCreditCard: req.body.accepsCreditCard,
    openHour: req.body.openHour,
    closeHour: req.body.closeHour
    }).then(doc => {
      res.json(doc);
      
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
}

function update(req,res){
  //Actualizar un recurso
  let attributes = ['title', 'description', 'accepsCreditCard', 'openHour', 'closeHour'];
  let placeParams = {};
  attributes.forEach(attr=>{
    if(Object.prototype.hasOwnProperty.call(req.body,attr)) {
      placeParams[attr] = req.body[attr];
    }
  })
  console.log(placeParams);
  req.place = Object.assign(req.place,placeParams);
  req.place.save()
    .then(doc=>{
      res.json(doc);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
}

function destroy(req,res){
  //Eliminar recursos
  req.place.remove().then(doc=>{
      res.json({});
    }).catch(err=>{
      console.log(err);
      res.json(err);
    })
}

function multerMiddlware(){
  return upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'cover', maxCount: 1}
  ])
}

module.exports = {index,create,show,destroy,update, find, multerMiddlware};
