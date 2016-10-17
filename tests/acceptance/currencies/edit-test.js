import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | currencies/edit', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /currencies/edit/:id', function(assert) {
  visit('/currencies/edit/:id');

  andThen(function() {
    assert.equal(currentURL(), '/currencies/edit/:id');
  });
});

test('Editing current currency', function(assert) {
  visit('/currencies');
  click('.primary');
  andThen(function() {
    assert.equal(currentPath(), 'currencies.edit');
  });
  fillIn('.currency-name', 'Main');
  fillIn('.currency-icon', '3');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'currencies.index');
  });
});

test('Return back', function(assert) {
  visit('/currencies');
  click('.primary');
  andThen(function() {
    assert.equal(currentPath(), 'currencies.edit');
  });
  click('.btn-default');
  andThen(function() {
    assert.equal(currentRouteName(), 'currencies.index');
  });
});
