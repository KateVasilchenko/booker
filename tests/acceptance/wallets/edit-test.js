import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | wallets/edit', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /wallets/edit/id', function(assert) {
  visit('/wallets/edit/:id');

  andThen(function() {
    assert.equal(currentURL(), '/wallets/edit/:id');
  });
});

test('Editing current wallet', function(assert) {
  visit('/wallets');
  click('.primary');
  andThen(function() {
    assert.equal(currentPath(), 'wallets.edit');
  });
  fillIn('.wallet-name', 'Main');
  fillIn('.wallet-balance', '3');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'wallets.index');
  });
});

test('Return back', function(assert) {
  visit('/wallets');
  click('.primary');
  andThen(function() {
    assert.equal(currentPath(), 'wallets.edit');
  });
  click('.btn-default');
  andThen(function() {
    assert.equal(currentRouteName(), 'wallets.index');
  });
});
