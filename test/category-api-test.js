'use strict';

const assert = require('chai').assert;
const PointService = require('./point-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Category API tests', function () {

  let categories = fixtures.categories;
  let newCategory = fixtures.newCategory;
  let newUser = fixtures.newUser;

  const pointService = new PointService('http://localhost:3000');

  suiteSetup(async function() {
    await pointService.deleteAllUsers();
    const returnedUser = await pointService.createUser(newUser);
    const response = await pointService.authenticate(newUser);
  });

  suiteTeardown(async function() {
    await pointService.deleteAllUsers();
    pointService.clearAuth();
  });

  setup(async function () {
    await pointService.deleteAllCategories();
  });

  teardown(async function () {
    await pointService.deleteAllCategories();
  });

  test('create a category', async function () {
    const returnedCategory = await pointService.createCategory(newCategory);
    assert(_.some([returnedCategory], newCategory), 'returnedCategory must be a superset of newCategory');
    assert.isDefined(returnedCategory._id);
  });

  test('get category', async function () {
    const c1 = await pointService.createCategory(newCategory);
    const c2 = await pointService.getCategory(c1._id);
    assert.deepEqual(c1, c2);
  });

  test('get invalid category', async function () {
    const c1 = await pointService.getCategory('1234');
    assert.isNull(c1);
    const c2 = await pointService.getCategory('012345678901234567890123');
    assert.isNull(c2);
  });


  test('delete a category', async function () {
    let c = await pointService.createCategory(newCategory);
    assert(c._id != null);
    await pointService.deleteOneCategory(c._id);
    c = await pointService.getCategory(c._id);
    assert(c == null);
  });

  test('get all categories', async function () {
    for (let c of categories) {
      await pointService.createCategory(c);
    }

    const allCategories = await pointService.getCategories();
    assert.equal(allCategories.length, categories.length);
  });

  test('get categories detail', async function () {
    for (let c of categories) {
      await pointService.createCategory(c);
    }

    const allCategories = await pointService.getCategories();
    for (var i = 0; i < categories.length; i++) {
      assert(_.some([allCategories[i]], categories[i]), 'returnedCandidate must be a superset of newCategory');
    }
  });

  test('get all categories empty', async function () {
    const allCategories = await pointService.getCategories();
    assert.equal(allCategories.length, 0);
  });

});
