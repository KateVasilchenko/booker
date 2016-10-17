import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | login', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /login', function(assert) {
  visit('/login');
  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('transition to register', function(assert) {
  visit('/login');
  click('.register');
  andThen(function() {
    assert.equal(currentRouteName(), 'register');
  });
});

test('login', function(assert) {
  visit('/login');
  click('.login');
  andThen(function() {
    assert.equal(currentRouteName(), 'login');
  });
});

test('login via social network', function(assert) {
  visit('/login');
  click('.social-network');
  andThen(function() {
    assert.equal(currentRouteName(), 'login');
  });
});
