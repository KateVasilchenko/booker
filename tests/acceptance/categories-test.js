import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | categories', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /categories', function(assert) {
  visit('/categories');

  andThen(function() {
    assert.equal(currentURL(), '/categories');
  });
});

test('clicked delete1 and confirm', function(assert) {
  visit('/categories');
  click('.delete-item');
  andThen(function() {
    assert.equal(find("h2:contains(Are you sure?)").text(), 'Are you sure?');
    assert.equal(currentRouteName(), 'categories.index', 'Stays on new page');
  });
  click('.delete-confirm');
  andThen(function() {
    assert.equal(currentRouteName(), 'categories.index', 'Stays on new page');
  });
});

test('clicked delete1 and cancel', function(assert) {
  visit('/categories');
  click('.delete-item');
  andThen(function() {
    assert.equal(find("h2:contains(Are you sure?)").text(), 'Are you sure?');
    assert.equal(currentRouteName(), 'categories.index', 'Stays on new page');
  });
  click('.cancel');
  andThen(function() {
    assert.equal(currentRouteName(), 'categories.index', 'Stays on new page');
  });
});

test('clicked edit and cancel', function(assert) {
  visit('/categories');
  click('.primary');
  andThen(function() {
    assert.equal(currentRouteName(), 'categories.edit');
  });
  click('.cancel');
  andThen(function() {
    assert.equal(currentRouteName(), 'categories.index', 'Stays on new page');
  });
});

test('load more', function(assert) {
  visit('/categories');
  click('.load-more');
  andThen(function() {
    assert.equal(currentRouteName(), 'categories.index');
  });
});
