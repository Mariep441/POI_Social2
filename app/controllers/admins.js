'use strict';

const Point = require('../models/point');
const User = require('../models/user');

const Admins = {

  list_users: {
    handler: async function(request, h) {
      const user = await User.find().lean();
      const points = await Point.find().populate('contributor').lean();
      const numberPoints = await Point.countDocuments();
      return h.view('admin', {title: 'admin', user: user, points: points, numberPoints:numberPoints });
    }
  },

  show_user_details: {
    handler: async function (request, h) {
      const id = request.params._id;
      const user = await User.findById(id).lean();
      return h.view('admin_edit_user', {title: 'Admin edit user details', user: user});
    }
  },

  edit_user_details: {
    handler: async function(request, h) {
      const userEdit = request.payload;
      const id = request.params._id;
      const user = await User.findById(id);
      user.firstName = userEdit.firstName;
      user.lastName = userEdit.lastName;
      user.email = userEdit.email;
      user.password = userEdit.password;
      await user.save();
      return h.redirect('/admin');
    }
  },

  delete_user: {
    handler: async function(request, h) {
      const _id = request.params._id;
      await User.remove_user(_id).lean();
      return h.redirect('/admin');
    }
  },

};

module.exports = Admins;
