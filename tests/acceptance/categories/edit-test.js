import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | categories/edit', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /categories/edit/id', function(assert) {
  visit('/categories/edit/:id');
  andThen(function() {
    assert.equal(currentURL(), '/categories/edit/:id');
  });
});

test('Editing current category', function(assert) {
  visit('/categories');
  click('.primary');
  andThen(function() {
    assert.equal(currentPath(), 'categories.edit');
  });
  fillIn('.category-name', 'Main');
  fillIn('.category-icon', '3');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'categories.index');
  });
});

test('Return back', function(assert) {
  visit('/categories');
  click('.primary');
  andThen(function() {
    assert.equal(currentPath(), 'categories.edit');
  });
  click('.btn-default');
  andThen(function() {
    assert.equal(currentRouteName(), 'categories.index');
  });
});

test('Editing a category but something wrong with model', function(assert) {
  visit('/categories');
  click('.primary');
  andThen(function() {
    assert.equal(currentPath(), 'categories.edit');
  });
  fillIn('.category-name', '');
  fillIn('.category-icon', '10');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'categories.edit');
  });
});

test('show error', function(assert) {
  visit('/categories');
  click('.primary');
  andThen(function() {
    assert.equal(currentPath(), 'categories.edit');
  });
  fillIn('.category-name', '');
  fillIn('.category-icon', '10');
  click('.save');
  andThen(function() {
    assert.equal(find("span:visible").text().replace(/×can't/g, "can't"), "can't be blank");
    assert.equal(currentRouteName(), 'categories.edit');
  });
});
