import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | incomes', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /incomes', function(assert) {
  visit('/incomes');

  andThen(function() {
    assert.equal(currentURL(), '/incomes');
  });
});

test('clicked delete1 and confirm', function(assert) {
  visit('/incomes');
  click('.delete-item');
  andThen(function() {
    assert.equal(find("h2:contains(Are you sure?)").text(), 'Are you sure?');
    assert.equal(currentRouteName(), 'incomes.index', 'Stays on new page');
  });
  click('.delete-confirm');
  andThen(function() {
    assert.equal(currentRouteName(), 'incomes.index', 'Stays on new page');
  });
});

test('clicked delete1 and cancel', function(assert) {
  visit('/incomes');
  click('.delete-item');
  andThen(function() {
    assert.equal(find("h2:contains(Are you sure?)").text(), 'Are you sure?');
    assert.equal(currentRouteName(), 'incomes.index', 'Stays on new page');
  });
  click('.cancel');
  andThen(function() {
    assert.equal(currentRouteName(), 'incomes.index', 'Stays on new page');
  });
});

test('clicked edit and cancel', function(assert) {
  visit('/incomes');
  click('.primary');
  andThen(function() {
    assert.equal(currentRouteName(), 'incomes.edit');
  });
  click('.cancel');
  andThen(function() {
    assert.equal(currentRouteName(), 'incomes.index', 'Stays on new page');
  });
});
