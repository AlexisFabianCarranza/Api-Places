var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Importar datos
const db = require('./config/database.js');
db.connect();
const Place = require('./models/Place');
//
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Creando un nuevo lugar
app.post('/places', (req,res)=>{
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
});

app.get('/places', (req,res)=>{
  Place.find({}).then(docs=>{
    res.json(docs);
  }).catch(err => {
    console.log(err);
    res.json(err);
  })
});

app.get('/places/:id', (req,res)=>{
  Place.findById(req.params.id)
    .then(doc=>{
      res.json(doc);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    })
});

app.put('/places/:id',(req,res)=>{
  //Place.findById---
  let attributes = ['title', 'description', 'accepsCreditCard', 'openHour', 'closeHour'];
  let placeParams = {};
  attributes.forEach(attr=>{
    if (Objects.prototype.hasOwnProperty.call(req.body,attr))
      placeParams[attr] = req.body[attr]
  });
  Place.findOneAndUpdate({'_id': req.params.id},placeParams)
  .then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  })
});

app.delete('/places/:id', (req,res)=>{
  Place.findByIdAndRemove(req.params.id)
    .then(doc=>{
      res.json({})
    }).catch(err=<{
      console.log(err);
      res.json(err);
    })
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
