'use strict';

const assert = require('chai').assert;
const PointService = require('./point-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');


suite('Review API tests', function() {
  let reviews = fixtures.reviews;
  let newReview = fixtures.newReview;
  let newUser = fixtures.newUser;
  let points = fixtures.points;
  let newCategory = fixtures.newCategory;
  let newPoint = fixtures.newPoint;

  const pointService = new PointService(fixtures.pointService);

  suiteSetup(async function() {
    await pointService.deleteAllUsers();
    const returnedUser = await pointService.createUser(newUser);
    const response = await pointService.authenticate(newUser);
  });

  suiteTeardown(async function() {
    await pointService.deleteAllUsers();
    pointService.clearAuth();
  });

  setup(async function() {
    pointService.deleteAllReviews();
  });

  teardown(async function() {
    pointService.deleteAllReviews();
  });

  test('create a review', async function() {
    const returnedCategory = await pointService.createCategory(newCategory);
    console.log(returnedCategory);
    await pointService.createPoint(returnedCategory._id, points[0]);
    const returnedPoint = await pointService.createPoint(returnedCategory._id,newPoint);
    console.log(returnedPoint);
    await pointService.createReview(returnedPoint._id, reviews[0]);
    const returnedReviews = await pointService.getReviews(returnedPoint._id);
    console.log(returnedReviews[0]);
    console.log(reviews[0]);
    assert.equal(returnedReviews.length, 1);
    assert(_.some([returnedReviews[0]], reviews[0]), 'returned review must be a superset of review ');
  });


  test('get a review', async function () {
    const returnedCategory = await pointService.createCategory(newCategory);
    await pointService.createPoint(returnedCategory._id, points[0]);
    const returnedPoint = await pointService.createPoint(returnedCategory._id,newPoint);
    await pointService.createReview(returnedPoint._id, reviews[0]);
    const r1 = await pointService.getReviews(returnedPoint._id);
    console.log(r1);
    const r2 = await pointService.getReviews(r1._id);
    console.log(r2);
    assert.deepEqual(r1, r2);
  });

  test('get invalid review', async function () {
    const r1 = await pointService.getReview('1234');
    assert.isNull(r1);
    const r2 = await pointService.getReview('012345678901234567890123');
    assert.isNull(r2);
  });


  test('get all reviews', async function () {
    for (let r of reviews) {
      const returnedCategory = await pointService.createCategory(newCategory);
      await pointService.createPoint(returnedCategory._id, points[0]);
      const returnedPoint = await pointService.createPoint(returnedCategory._id,newPoint);
      await pointService.createReview(returnedPoint._id, reviews[0]);
      await pointService.createReview(r);
    }

    const allReviews = await pointService.getReviews();
    assert.equal(allReviews.length, reviews.length);
  });

  test('get reviews detail', async function () {
    for (let r of reviews) {
      const returnedCategory = await pointService.createCategory(newCategory);
      await pointService.createPoint(returnedCategory._id, points[0]);
      const returnedPoint = await pointService.createPoint(returnedCategory._id,newPoint);
      await pointService.createReview(returnedPoint._id, reviews[0]);
    }

    const allReviews = await pointService.getReviews();
    for (var i = 0; i < reviews.length; i++) {
      assert(_.some([allReviews[i]], reviews[i]), 'returnedReview must be a superset of newReview');
    }
  });

  test('get all reviews empty', async function () {
    const allReviews = await pointService.getReviews();
    assert.equal(allReviews.length, 0);
  });


  test('delete a review', async function () {
    const returnedCategory = await pointService.createCategory(newCategory);
    await pointService.createPoint(returnedCategory._id, points[0]);
    const returnedPoint = await pointService.createPoint(returnedCategory._id,newPoint);
    await pointService.createReview(returnedPoint._id, reviews[0]);
    let r = await pointService.getReviews(returnedPoint._id);
    assert.isNotNull(r);
    await pointService.deleteOneReview(r._id);
    r = await pointService.getReview(r._id);
    assert(r == null);
  });

});
