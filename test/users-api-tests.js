'use strict';

const assert = require('chai').assert;
const PointService = require('./point-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function() {
  let users = fixtures.users;
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

  test('create a user', async function() {
    const returnedUser = await pointService.createUser(newUser);
    assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
    assert.isDefined(returnedUser._id);
  });

  test('get user', async function() {
    const u1 = await pointService.createUser(newUser);
    const u2 = await pointService.getUser(u1._id);
    assert.deepEqual(u1, u2);
  });

  test('get invalid user', async function() {
    const u1 = await pointService.getUser('1234');
    assert.isNull(u1);
    const u2 = await pointService.getUser('012345678901234567890123');
    assert.isNull(u2);
  });

  test('delete a user', async function() {
    let u = await pointService.createUser(newUser);
    assert(u._id != null);
    await pointService.deleteOneUser(u._id);
    u = await pointService.getUser(u._id);
    assert(u == null);
  });

  test('get all users', async function() {
    await pointService.deleteAllUsers();
    await pointService.createUser(newUser);
    await pointService.authenticate(newUser);
    for (let u of users) {
      await pointService.createUser(u);
    }

    const allUsers = await pointService.getUsers();
    assert.equal(allUsers.length, users.length + 1);
  });

  test('get users detail', async function() {
    await pointService.deleteAllUsers();
    const user = await pointService.createUser(newUser);
    await pointService.authenticate(newUser);
    for (let u of users) {
      await pointService.createUser(u);
    }

    const testUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };
    users.unshift(testUser);
    const allUsers = await pointService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), 'returnedUser must be a superset of newUser');
    }
  });

  test('get all users empty', async function() {
    await pointService.deleteAllUsers();
    const user = await pointService.createUser(newUser);
    await pointService.authenticate(newUser);
    const allUsers = await pointService.getUsers();
    assert.equal(allUsers.length, 1);
  });
});
