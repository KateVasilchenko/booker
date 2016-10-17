import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | outcomes/edit', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /outcomes/edit/:id', function(assert) {
  visit('/outcomes/edit/:id');

  andThen(function() {
    assert.equal(currentURL(), '/outcomes/edit/:id');
  });
});

test('Editing current outcome', function(assert) {
  visit('/outcomes');
  click('.primary');
  andThen(function() {
    assert.equal(currentPath(), 'outcomes.edit');
  });
  fillIn('.outcome-name', 'Main');
  fillIn('.outcome-amount', '3');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'outcomes.index');
  });
});

test('Return back', function(assert) {
  visit('/outcomes');
  click('.primary');
  andThen(function() {
    assert.equal(currentPath(), 'outcomes.edit');
  });
  click('.btn-default');
  andThen(function() {
    assert.equal(currentRouteName(), 'outcomes.index');
  });
});
