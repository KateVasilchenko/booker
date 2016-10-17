import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | currencies/new', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /currencies/new', function(assert) {
  visit('/currencies/new');

  andThen(function() {
    assert.equal(currentURL(), '/currencies/new');
  });
});

test('Return back', function(assert) {
  visit('/currencies/new');
  click('.btn-default');
  andThen(function() {
    assert.equal(currentRouteName(), 'currencies.index');
  });
});

test('Create a new currency', function(assert) {
  visit('/currencies');
  click('.new-currency');
  andThen(function() {
    assert.equal(currentPath(), 'currencies.new');
  });
  fillIn('.currency-name', 'New');
  fillIn('.currency-icon', '10');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'currencies.index');
  });
});

test('Create a new currency but something wrong with model', function(assert) {
  visit('/currencies');
  click('.new-currency');
  andThen(function() {
    assert.equal(currentPath(), 'currencies.new');
  });
  fillIn('.currency-name', '');
  fillIn('.currency-icon', '10');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'currencies.new');
  });
});
