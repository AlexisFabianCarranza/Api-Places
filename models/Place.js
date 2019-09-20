const mongoose = require('mongoose');
const moongosePaginate = require('mongoose-paginate');

let placeSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
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

placeSchema.plugin(moongosePaginate);
let Place = mongoose.model('Place', placeSchema);

module.exports = Place;
