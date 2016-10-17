import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | incomes/new', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /incomes/new', function(assert) {
  visit('/incomes/new');

  andThen(function() {
    assert.equal(currentURL(), '/incomes/new');
  });
});

test('Return back', function(assert) {
  visit('/incomes/new');
  click('.btn-default');
  andThen(function() {
    assert.equal(currentRouteName(), 'incomes.index');
  });
});

test('Create a new income', function(assert) {
  visit('/incomes');
  click('.new-income');
  andThen(function() {
    assert.equal(currentPath(), 'incomes.new');
  });
  fillIn('.income-name', 'New');
  fillIn('.income-amount', '10');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'incomes.index');
  });
});

test('Create a new income but something wrong with model', function(assert) {
  visit('/incomes');
  click('.new-income');
  andThen(function() {
    assert.equal(currentPath(), 'incomes.new');
  });
  fillIn('.income-name', '');
  fillIn('.income-amount', '10');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'incomes.new');
  });
});
