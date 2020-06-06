'use strict';

const Point = require('../models/point');
const Boom = require('@hapi/boom');
const Category = require('../models/category');
const utils = require('./utils.js');
const Reviews = require('../models/review');

const Points = {
  findAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const points = await Point.find().populate('contributor').populate('category').lean();
      return points;
    }
  },
  findByCategory: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const points = await Point.find({ category: request.params.id });
      return points;
    }
  },
  findOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const point = await Point.findOne({ _id: request.params.id });
        if (!point) {
          return Boom.notFound('No Point with this id');
        }
        return point;
      } catch (err) {
        return Boom.notFound('No Point with this id');
      }
    }
  },

  create: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const userId = utils.getUserIdFromRequest(request);
      let point = new Point(request.payload);
      const category = await Category.findOne({ _id: request.params.id });
      if (!category) {
        return Boom.notFound('No Category with this id');
      }
      point.category = category._id;
      point.contributor = userId;
      point = await point.save();
      if (point) {
        return h.response(point).code(201);
      }
      return Boom.badImplementation('error creating point');
    }
  },


  addPoint: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const userId = utils.getUserIdFromRequest(request);
      let point = new Point(request.payload);
      const category = await Category.findOne({ _id: request.params.id });
      if (!category) {
        return Boom.notFound('No Category with this id');
      }
      point.category = category._id;
      point.contributor = userId;
      point = await point.save();
      return point;
    }
  },

  deleteOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function (request, h) {
      const point = await Point.deleteOne({ _id: request.params.id });
      if (point) {
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
      await Point.deleteMany({});
      return { success: true };
    }
  }
};

module.exports = Points;
