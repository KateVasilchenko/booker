import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | register', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /register', function(assert) {
  visit('/register');

  andThen(function() {
    assert.equal(currentURL(), '/register');
  });
});

test('Password repeated correctly', function(assert) {
  visit('/register');
  fillIn('.nick-name', 'Main1');
  fillIn('.email', '789456@list.ru');
  fillIn('.password', '3');
  fillIn('.repeatedPassword', '3');
  click('.primaryForRegister');
  andThen(function() {
    assert.equal(find('.nick-name').text().replace(/^/g, 'Main'), 'Main');
    assert.equal(find('.email').text().replace(/^/g, '789456@list.ru'), '789456@list.ru');
    assert.equal(find('.password').text().replace(/^/g, '3'), '3');
    assert.equal(find('.repeatedPassword').text().replace(/^/g, '3'), '3');
    assert.equal(find('.password').text().replace(/^/g, '3'), find('.repeatedPassword').text().replace(/^/g, '3'));
  });
});

test('Wrong password', function(assert) {
  visit('/register');
  fillIn('.nick-name', 'Main2');
  fillIn('.email', '789456@list.ru');
  fillIn('.password', '3');
  fillIn('.repeatedPassword', '4');
  click('.primaryForRegister');
  andThen(function() {
    assert.equal(find('.nick-name').text().replace(/^/g, 'Main'), 'Main');
    assert.equal(find('.email').text().replace(/^/g, '789456@list.ru'), '789456@list.ru');
    assert.equal(find('.password').text().replace(/^/g, '3'), '3');
    assert.equal(find('.repeatedPassword').text().replace(/^/g, '4'), '4');
  });
});

test('All fields are blank', function(assert) {
  visit('/register');
  fillIn('.nick-name', 'Main2');
  fillIn('.email', '789456@list.ru');
  fillIn('.password', '');
  fillIn('.repeatedPassword', '4');
  click('.primaryForRegister');
  andThen(function() {
    assert.equal(find('.nick-name').text().replace(/^/g, 'Main'), 'Main');
    assert.equal(find('.email').text().replace(/^/g, '789456@list.ru'), '789456@list.ru');
    assert.equal(find('.password').text().replace(/^/g, ''), '');
    assert.equal(find('.repeatedPassword').text().replace(/^/g, '4'), '4');
  });
});
