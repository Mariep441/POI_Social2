'use strict';

const Point = require('../models/point');
const Boom = require('@hapi/boom');
const Category = require('../models/category');
const utils = require('./utils.js');
const Reviews = require('../models/review');

const Reviews = {
  findAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const reviews = await Review.find();
      return reviews;
    }
  },
  findByPoint: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const reviews = await Review.find({ point: request.params.id });
      return reviews;
    }
  },
  addReview: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const userId = utils.getUserIdFromRequest(request);
      let review = new Review(request.payload);
      const point = await Point.findOne({ _id: request.params.id });
      if (!point) {
        return Boom.notFound('No Point with this id');
      }
      review.point = point._id;
      review.contributor = userId;
      review = await review.save();
      return review;
    }
  },

  deleteOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function (request, h) {
      const review = await Review.deleteOne({ _id: request.params.id });
      if (review) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    },
  },

  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await Review.deleteMany({});
      return { success: true };
    }
  }
};

module.exports = Reviews;