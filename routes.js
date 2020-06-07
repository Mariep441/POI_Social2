'use strict';

const Accounts = require('./app/controllers/accounts');
const Points = require('./app/controllers/points');
const Categories = require('./app/controllers/categories');
const Admins = require('./app/controllers/admins');
const Gallery = require('./app/controllers/gallery');
const Reviews = require('./app/controllers/reviews');

module.exports = [
  { method: 'GET', path: '/', config: Accounts.index },
  { method: 'GET', path: '/signup', config: Accounts.showSignup },
  { method: 'GET', path: '/login', config: Accounts.showLogin },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/signup', config: Accounts.signup },
  { method: 'POST', path: '/login', config: Accounts.login },

  { method: 'GET', path: '/view_all_categories', config:Categories.view_all_categories },
  { method: 'POST', path: '/add_category', config: Categories.add_category },
  { method: 'GET', path: '/delete_category/{_id}', config: Categories.delete_category },

  { method: 'GET', path: '/home', config: Points.home },
  { method: 'GET', path: '/view_add_POI', config: Points.view_add_POI },
  { method: 'GET', path: '/view_list_POI', config:Points.view_list_POI },
  { method: 'POST', path: '/add_POI', config: Points.addPOI },

  { method: 'GET', path: '/details/view_POI/{_id}', config: Points.view_POI },
  { method: 'GET', path: '/details/delete_POI/{_id}', config: Points.delete_POI },
  { method: 'GET', path: '/details/view_edit_POI/{_id}', config: Points.view_edit_POI },
  { method: 'POST', path: '/details/edit_POI/{_id}', config: Points.edit_POI },

  { method: 'GET', path: '/view_all_reviews', config:Reviews.view_all_reviews },
  { method: 'GET', path: '/view_add_review', config:Reviews.view_add_review },
  { method: 'POST', path: '/add_review', config: Reviews.add_review },
  { method: 'GET', path: '/delete_review/{_id}', config: Reviews.delete_review },

  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },

  { method: 'GET', path: '/admin', config: Admins.list_users },
  { method: 'GET', path: '/admin_edit_user/{_id}', config: Admins.show_user_details },
  { method: 'POST', path: '/admin_edit_user/{_id}', config: Admins.edit_user_details },
  { method: 'GET', path: '/admin_delete_user/{_id}', config: Admins.delete_user },

  { method: 'GET', path: '/gallery', config: Gallery.index },
  { method: 'GET', path: '/details/view_upload_image/{_id}', config: Gallery.view_upload_image },
  { method: 'POST', path: '/details/view_upload_image/{_id}', config: Gallery.uploadFile },
  { method: 'GET', path: '/deleteImage/{_id}', config: Gallery.deleteImage },
  { method: 'POST', path: '/deleteImage/{_id}', config: Gallery.deleteImage },



  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './public'
      }
    },
    options: { auth: false }
  }
];
