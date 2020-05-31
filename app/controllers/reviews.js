'use strict';

const Point = require('../models/point');
const User = require('../models/user');
const Category = require('../models/category');
const Review = require('../models/review');
const Joi = require('@hapi/joi');

const Reviews = {

  home: {
    handler: async function(request, h) {
      try {
        const points = await Point.find().populate('contributor').populate('category').lean();
        const reviews = await Review.find().populate('point').populate('contributor').lean();
        return h.view('home', {title: 'Points to Date', reviews: reviews, points: points});
      } catch (err) {
        return h.view('home', { errors: [{ message: err.message }] });
      }
    }
  },

  view_all_reviews: {
    handler: async function(request, h) {
      try {
        const points = await Point.find().populate('contributor').populate('category').lean();
        const reviews = await Review.find().populate('point').populate('contributor').lean();
        return h.view('view_all_reviews', {title: 'Reviews to Date', reviews: reviews, points: points});
      } catch (err) {
        return h.view('home', { errors: [{ message: err.message }] });
      }
    }
  },

  view_add_review: {
    handler: async function(request, h) {
      const categories = await Category.find().lean();
      const points = await Point.find().populate('contributor').populate('category').lean();
      return h.view('view_add_review', { title: 'Add a Point of Interest',  categories: categories, points: points});
    }
  },

  add_review: {
    validate: {
      payload: {
        comment: Joi.string().required(),
        star: Joi.number().required(),
        point: Joi.string().required(),
      },
      options: {
        abortEarly: false
      },
      failAction: async function(request, h, error) {
        const points = await Point.find().populate('contributor').lean();
        return h
          .view('view_add_review', {
            title: 'Invalid Review',
            points: points,
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        const rawPoint = request.payload.point.split(',');
        const point = await Point.findOne({name: rawPoint[0]});

        const newReview = new Review({
          comment: data.comment,
          star: data.star,
          point: point._id,
          contributor: user._id
        });

        await newReview.save();
        return h.redirect('/view_all_reviews');
      } catch (err) {
        return h.view('view_add_review', {errors: [{message: err.message}]});
      }
    }
  },

  delete_review: {
    handler: async function(request, h) {
      const _id = request.params._id;
      await Review.remove_review(_id).lean();
      return h.redirect('/home');
    }
  },

};


module.exports = Reviews;