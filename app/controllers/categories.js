'use strict';

const Point = require('../models/point');
const User = require('../models/user');
const Category = require('../models/category');
const Joi = require('@hapi/joi');


const Categories = {

  view_all_categories: {
    handler: async function(request, h) {
      try {
        const categories = await Category.find().lean();
        return h.view('view_all_categories', {title: 'Points to Date', categories: categories});
      } catch (err) {
        return h.view('home', { errors: [{ message: err.message }] });
      }
    }
  },

  add_category: {
    handler: async function (request, h) {
      try {
        const data = request.payload;

        const newCategory = new Category({
          costalZone: data.costalZone,
        });

        await newCategory.save();
        return h.redirect('/view_list_POI');
      } catch (err) {
        return h.view('home', {errors: [{message: err.message}]});
      }
    }
  },

  delete_category: {
    handler: async function(request, h) {
      const _id = request.params._id;
      await Category.delete_category(_id).lean();
      return h.redirect('/home');
    }
  },

};

module.exports = Categories;