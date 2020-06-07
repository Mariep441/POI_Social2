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

imageSchema.statics.findById = function(_id) {
  return this.findOne({ public_id : _id});
};


imageSchema.statics.findAndUpdateById = function(_id) {
  return this.findOneAndUpdate({ _id : _id}, {new: true});
};


imageSchema.statics.findAndRemoveById = function(_id) {
  return this.findOneAndDelete({ public_id: _id });
};


module.exports = Mongoose.model('Image', imageSchema);