'use strict';

const assert = require('chai').assert;
const PointService = require('./point-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');


suite('Point API tests', function() {
  let points = fixtures.points;
  let newPoint = fixtures.newPoint;
  let newCategory = fixtures.newCategory;
  let newUser = fixtures.newUser;

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
    pointService.deleteAllCategories();
    pointService.deleteAllPoints();
  });

  teardown(async function() {});

  test('create a point', async function() {
    const returnedCategory = await pointService.createCategory(newCategory);
    await pointService.createPoint(returnedCategory._id, points[0]);
    const returnedPoints = await pointService.getPoints(returnedCategory._id);
    console.log(returnedPoints[0]);
    console.log(points[0]);
    assert.equal(returnedPoints.length, 1);
    assert(_.some([returnedPoints[0]], points[0]), 'returnedPoint must be a superset of point');
  });

  test('create multiple points', async function() {
    const returnedCategory = await pointService.createCategory(newCategory);
    for (var i = 0; i < points.length; i++) {
      await pointService.createPoint(returnedCategory._id, points[i]);
    }

    const returnedPoints = await pointService.getPoints(returnedCategory._id);
    assert.equal(returnedPoints.length, points.length);
    for (var i = 0; i < points.length; i++) {
        assert(_.some([returnedPoints[i]], [points[i]]), 'returnedPoint must be a superset of point');

    }
  });

  test('delete a point', async function () {
    let c = await pointService.createPoint(newCandidate);
    assert(c._id != null);
    await donationService.deleteOneCandidate(c._id);
    c = await donationService.getCandidate(c._id);
    assert(c == null);
  });



  test('delete all points', async function() {
    const returnedCategory = await pointService.createCategory(newCategory);
    for (var i = 0; i < points.length; i++) {
      await pointService.createPoint(returnedCategory._id, points[i]);
    }

    const d1 = await pointService.getPoints(returnedCategory._id);
    assert.equal(d1.length, points.length);
    await pointService.deleteAllPoints();
    const d2 = await pointService.getPoints(returnedCategory._id);
    assert.equal(d2.length, 0);
  });

  test('create a point and check contributor', async function() {
    const returnedCategory = await pointService.createCategory(newCategory);
    await pointService.createPoint(returnedCategory._id, points[0]);
    const returnedPoints = await pointService.getPoints(returnedCategory._id);
    assert.isDefined(returnedPoints[0].contributor);

    const users = await pointService.getUsers();
    assert(_.some([users[0]], newUser), 'returnedUser must be a superset of newUser');
  });
});
