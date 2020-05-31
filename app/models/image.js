'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const imageSchema = new Schema({
  public_id : String,
  version : String,
  signature : String,
  width : String ,
  height : String,
  format : String,
  resource_type : String,
  created_at : Date,
  tags : Array,
  bytes : String,
  type : String,
  etag : String,
  placeholder : Boolean,
  url : String,
  secure_url : String,
  original_filename : String,
  original_extension : String

});

imageSchema.statics.findAndUpdateById = function(_id) {
  return this.findOneAndUpdate({ _id : _id}, {new: true});
};


imageSchema.statics.remove_image = function(_id) {
  return this.splice(0,1);
};


module.exports = Mongoose.model('Image', imageSchema);