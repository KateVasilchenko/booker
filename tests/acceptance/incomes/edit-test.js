import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | incomes/edit', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /incomes/edit/:id', function(assert) {
  visit('/incomes/edit/:id');

  andThen(function() {
    assert.equal(currentURL(), '/incomes/edit/:id');
  });
});

test('Editing current income', function(assert) {
  visit('/incomes');
  click('.primary');
  andThen(function() {
    assert.equal(currentPath(), 'incomes.edit');
  });
  fillIn('.income-name', 'Main');
  fillIn('.income-amount', '3');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'incomes.index');
  });
});

test('Return back', function(assert) {
  visit('/incomes');
  click('.primary');
  andThen(function() {
    assert.equal(currentPath(), 'incomes.edit');
  });
  click('.btn-default');
  andThen(function() {
    assert.equal(currentRouteName(), 'incomes.index');
  });
});
