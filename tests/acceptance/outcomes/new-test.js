import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | outcomes/new', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /outcomes/new', function(assert) {
  visit('/outcomes/new');

  andThen(function() {
    assert.equal(currentURL(), '/outcomes/new');
  });
});

test('Return back', function(assert) {
  visit('/outcomes/new');
  click('.btn-default');
  andThen(function() {
    assert.equal(currentRouteName(), 'outcomes.index');
  });
});

test('Create a new outcome', function(assert) {
  visit('/outcomes');
  click('.new-outcome');
  andThen(function() {
    assert.equal(currentPath(), 'outcomes.new');
  });
  fillIn('.outcome-name', 'New');
  fillIn('.outcome-amount', '10');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'outcomes.index');
  });
});

test('Create a new outcome but something wrong with model', function(assert) {
  visit('/outcomes');
  click('.new-outcome');
  andThen(function() {
    assert.equal(currentPath(), 'outcomes.new');
  });
  fillIn('.outcome-name', '');
  fillIn('.outcome-amount', '10');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'outcomes.new');
  });
});
