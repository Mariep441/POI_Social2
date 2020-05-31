'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const reviewSchema = Schema({
  comment: String,
  star: Number,
  point: {
    type: Schema.Types.ObjectId,
    ref: 'Point'
  },
  contributor: {
  type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

reviewSchema.statics.findById = function(_id) {
  return this.findOne({ _id : _id});
};

reviewSchema.statics.findByPoint = function(point) {
  return this.find({ point : point});
};


reviewSchema.statics.findAndUpdateById = function(_id) {
  return this.findOneAndUpdate({ _id : _id}, {new: true});
};

reviewSchema.statics.remove_review = function(_id) {
  return this.deleteOne({ _id : _id});
};



module.exports = Mongoose.model('Review', reviewSchema);