
'use strict';

const ImageStore = require('../utils/image-store');
const Point = require('../models/point');
const Image = require('../models/image');

const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);


const Gallery = {
  index: {
    handler: async function(request, h) {
      try {
        const allImages = await ImageStore.getAllImages();
        return h.view('gallery', {
          title: 'Cloudinary Gallery',
          images: allImages
        });
      } catch (err) {
        console.log(err);
      }
    }
  },

  uploadFile: {
    handler: async function(request, h) {
      try {
        const imagefile = request.payload.imagefile;
        const _id = request.params._id;
        if (Object.keys(imagefile).length > 0) {

          await writeFile('./public/temp.img', imagefile);
          const image =  await cloudinary.v2.uploader.upload('./public/temp.img', function(error, result)
          {console.log(result.url, error)});

          await Point.findByIdAndUpdate({_id: _id }, { $push: {image : image }})
          return h.redirect('/home');
        }
        return h.view('gallery', {title: 'Cloudinary Gallery', error: 'No file selected'
        });
      } catch (err) {
        console.log(err);
      }
    },
    payload: {
      multipart: true,
      output: 'data',
      maxBytes: 209715200,
      parse: true
    }
  },


  deleteImage: {
    handler: async function(request, h) {
      try {
        await ImageStore.deleteImage(request.params._id)
        await Point.Image.splice(0,1);
        return h.redirect('/home');

      } catch (err) {
        console.log(err);
      }
    }
  },


  view_upload_image: {
    handler: async function(request, h) {
      const _id = request.params._id;
      const points = await Point.findById(_id).populate('contributor').lean();
      return h.view('view_upload_image', {title: 'All Points of Interest', points: points});
    }
  }

};

module.exports = Gallery;