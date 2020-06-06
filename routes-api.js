const Categories = require('./app/api/categories');
const Users = require('./app/api/users');
const Points = require('./app/api/points');
const Reviews = require('./app/api/reviews');

module.exports = [
  { method: 'GET', path: '/api/categories', config: Categories.find },
  { method: 'GET', path: '/api/categories/{id}', config:  Categories.findOne },
  { method: 'POST', path: '/api/categories', config:  Categories.create },
  { method: 'DELETE', path: '/api/categories/{id}', config:  Categories.deleteOne },
  { method: 'DELETE', path: '/api/categories', config:  Categories.deleteAll },

  { method: 'GET', path: '/api/users', config: Users.find },
  { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
  { method: 'POST', path: '/api/users', config: Users.create },
  { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
  { method: 'DELETE', path: '/api/users', config: Users.deleteAll },

  { method: 'GET', path: '/api/points', config: Points.findAll },
  { method: 'GET', path: '/api/points/{id}', config: Points.findOne },
  { method: 'POST', path: '/api/points', config: Points.create },
  { method: 'GET', path: '/api/categories/{id}/points', config: Points.findByCategory },
  { method: 'POST', path: '/api/categories/{id}/points', config: Points.addPoint },
  { method: 'DELETE', path: '/api/points', config: Points.deleteAll },

  { method: 'GET', path: '/api/reviews', config: Reviews.findAll },
  { method: 'POST', path: '/api/reviews', config: Reviews.create },
  { method: 'GET', path: '/api/points/{id}/reviews', config: Reviews.findByPoint },
  { method: 'POST', path: '/api/points/{id}/reviews', config: Reviews.addReview },
  { method: 'DELETE', path: '/api/reviews', config: Reviews.deleteAll },

  { method: 'POST', path: '/api/users/authenticate', config: Users.authenticate }
];
