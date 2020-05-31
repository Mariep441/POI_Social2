'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const categorySchema = Schema({
  costalZone: String,
});

categorySchema.statics.findAndUpdateById = function(_id) {
  return this.findOneAndUpdate({ _id : _id}, {new: true});
};



module.exports = Mongoose.model('Category', categorySchema);