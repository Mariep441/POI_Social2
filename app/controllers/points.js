'use strict';

const Point = require('../models/point');
const Review = require('../models/review');
const User = require('../models/user');
const Category = require('../models/category');
const Joi = require('@hapi/joi');

const Points = {

  home: {
    handler: async function(request, h) {
      try {
        const points = await Point.find().populate('contributor').populate('category').lean();
        return h.view('home', {title: 'Points to Date', points: points});
      } catch (err) {
        return h.view('home', { errors: [{ message: err.message }] });
      }
    }
  },

  view_POI: {
    handler: async function(request, h) {
      const _id = request.params._id;
      const points = await Point.findById(_id).populate('contributor').populate('category').lean();
      const reviews = await Review.findByPoint(points).populate('point').populate('contributor').lean();
      let rating = 0;
      reviews.forEach(review => {
        rating += review.star/reviews.length;
      });
      return h.view('details', {title: 'details', points: points, reviews: reviews, rating: rating});
    }
  },


  view_list_POI: {
    handler: async function(request, h) {
      try {
        const points = await Point.find().populate('contributor').populate('category').lean();
        const reviews = await Review.findByPoint(points).populate('point').populate('contributor').lean();
        let rating = 0;
        return h.view('view_list_POI', {title: 'Points to Date', points: points, reviews:reviews, rating: rating});
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  view_add_POI: {
    handler: async function(request, h) {
      const categories = await Category.find().lean();
      return h.view('view_add_POI', { title: 'Add a Point of Interest',  categories: categories });
    }
  },

  addPOI: {
    validate: {
      payload: {
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        lat: Joi.number().required(),
        long: Joi.number().required(),
      },
      options: {
        abortEarly: false
      },
      failAction: async function(request, h, error) {
        const categories = await Category.find().lean();
        return h
          .view('view_add_POI', {
            title: 'Invalid POI',
            categories: categories,
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

        const rawCategory = request.payload.category.split(',');
        const category = await Category.findOne({costalZone: rawCategory[0]});

        const newPoint = new Point({
          name: data.name,
          description: data.description,
          category: category._id,
          coordinates: {
              lat: data.lat,
              long: data.long,
          },
          contributor: user._id
        });

        await newPoint.save();
        return h.redirect('/view_list_POI');
      } catch (err) {
        return h.view('view_add_POI', {errors: [{message: err.message}]});
      }
    }
  },

  view_edit_POI: {
    handler: async function(request, h) {
      const _id = request.params._id;
      const points = await Point.findById(_id).populate('contributor').populate('category').lean();
      const categories = await Category.find().lean();
      return h.view('view_edit_POI', {title: 'Edit a Point of Interest', points: points, categories:categories });
    }
  },


  edit_POI: {
    handler: async function (request, h) {
      try {
        const userEdit = request.payload;
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const _id = request.params._id;

        const rawCategory = request.payload.category.split(',');
        const category = await Category.findOne({
          costalZone: rawCategory[0]
        });


        await Point.findByIdAndUpdate(
          {_id: _id },
          {name: userEdit.name,
            description: userEdit.description,
            category:category._id,
            coordinates: {
                lat: userEdit.lat,
                long: userEdit.long,
            },
            contributor: user._id})

        return h.redirect('/view_list_POI');
      } catch (err) {
        return h.view('home', {errors: [{message: err.message}]});
      }
    }
  },


  delete_POI: {
    handler: async function(request, h) {
      const _id = request.params._id;
      await Point.remove_POI(_id).lean();
      return h.redirect('/view_list_POI');
    }
  },

};

module.exports = Points;
