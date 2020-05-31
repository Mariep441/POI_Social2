
'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const pointSchema = new Schema({
  name: String,
  description: String,
  coordinates: {
      lat: Number,
      long: Number
  },
  image: Array,
  category:{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  contributor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

pointSchema.statics.findById = function(_id) {
  return this.findOne({ _id : _id});
};

pointSchema.statics.findAndUpdateById = function(_id) {
  return this.findOneAndUpdate({ _id : _id}, {new: true});
};

pointSchema.statics.remove_POI = function(_id) {
  return this.deleteOne({ _id : _id});
};


module.exports = Mongoose.model('Point', pointSchema);