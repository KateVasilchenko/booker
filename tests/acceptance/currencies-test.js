import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | currencies', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /currencies', function(assert) {
  visit('/currencies');

  andThen(function() {
    assert.equal(currentURL(), '/currencies');
  });
});

test('clicked delete1 and confirm', function(assert) {
  visit('/currencies');
  click('.delete-item');
  andThen(function() {
    assert.equal(find("h2:contains(Are you sure?)").text(), 'Are you sure?');
    assert.equal(currentRouteName(), 'currencies.index', 'Stays on new page');
  });
  click('.delete-confirm');
  andThen(function() {
    assert.equal(currentRouteName(), 'currencies.index', 'Stays on new page');
  });
});

test('clicked delete1 and cancel', function(assert) {
  visit('/currencies');
  click('.delete-item');
  andThen(function() {
    assert.equal(find("h2:contains(Are you sure?)").text(), 'Are you sure?');
    assert.equal(currentRouteName(), 'currencies.index', 'Stays on new page');
  });
  click('.cancel');
  andThen(function() {
    assert.equal(currentRouteName(), 'currencies.index', 'Stays on new page');
  });
});

test('clicked edit and cancel', function(assert) {
  visit('/currencies');
  click('.primary');
  andThen(function() {
    assert.equal(currentRouteName(), 'currencies.edit');
  });
  click('.cancel');
  andThen(function() {
    assert.equal(currentRouteName(), 'currencies.index', 'Stays on new page');
  });
});
