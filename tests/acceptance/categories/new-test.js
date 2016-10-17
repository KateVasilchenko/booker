import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | categories/new', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /categories/new', function(assert) {
  visit('/categories/new');
  andThen(function() {
    assert.equal(currentURL(), '/categories/new');
  });
});

test('Return back', function(assert) {
  visit('/categories/new');
  click('.btn-default');
  andThen(function() {
    assert.equal(currentRouteName(), 'categories.index');
  });
});

test('Create a new category', function(assert) {
  visit('/categories');
  click('.new-category');
  andThen(function() {
    assert.equal(currentPath(), 'categories.new');
  });
  fillIn('.category-name', 'New');
  fillIn('.category-icon', '10');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'categories.index');
  });
});

test('Create a new category but something wrong with model', function(assert) {
  visit('/categories');
  click('.new-category');
  andThen(function() {
    assert.equal(currentPath(), 'categories.new');
  });
  fillIn('.category-name', '');
  fillIn('.category-icon', '10');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'categories.new');
  });
});
