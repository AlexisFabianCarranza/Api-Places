const mongoose = require('mongoose');
const moongosePaginate = require('mongoose-paginate');
const uploader = require('./Uploader');
const slugify = require('../plugins/slugify');

let placeSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  slug:{
    type: String,
    unique: true
  },
  description: String,
  accepsCreditCard: {
    type: Boolean,
    default: false
  },
  coverImage: String,
  avatarImage: String,
  openHour: Number,
  closeHour: Number
});

placeSchema.methods.updateImage = function (path,imageType){
  //Primero subir la imagen
  //Guardar el lugar
  return uploader(path)
    .then(secure_url => this.saveImageUrl(secure_url, imageType));
}

placeSchema.methods.saveImageUrl = function (secureUrl, imageType){
  this[imageType+'Image'] = secureUrl;
  return this.save();
}

placeSchema.pre('save',function(next){
  generateSlugAndContinue.call(this,0,next);
});

placeSchema.statics.validateSlugCount = function(slug){
  return Place.count({slug: slug}).then(count =>{
    if (count > 0) return false;
    return true;
  })
}

function generateSlugAndContinue(count, next){
  this.slug = slugify(this.title);
  if (count != 0){
    this.slug = this.slug + "-" + count;
  }
  Place.validateSlugCount(this.slug).then(isValid =>{
    if (!isValid)
      return generateSlugAndContinue.call(this,count +1, next)
    next();
  })
}


placeSchema.plugin(moongosePaginate);
let Place = mongoose.model('Place', placeSchema);

module.exports = Place;
