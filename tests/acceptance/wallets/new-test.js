import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | wallets/new', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /wallets/new', function(assert) {
  visit('/wallets/new');

  andThen(function() {
    assert.equal(currentURL(), '/wallets/new');
  });
});

test('Return back', function(assert) {
  visit('/wallets/new');
  click('.btn-default');
  andThen(function() {
    assert.equal(currentRouteName(), 'wallets.index');
  });
});

test('Create a new wallet', function(assert) {
  visit('/wallets');
  click('.new-wallet');
  andThen(function() {
    assert.equal(currentPath(), 'wallets.new');
  });
  fillIn('.wallet-name', 'New');
  fillIn('.wallet-balance', '10');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'wallets.index');
  });
});

test('Create a new wallet but something wrong with model', function(assert) {
  visit('/wallets');
  click('.new-wallet');
  andThen(function() {
    assert.equal(currentPath(), 'wallets.new');
  });
  fillIn('.wallet-name', '');
  fillIn('.wallet-balance', '10');
  click('.save');
  andThen(function() {
    assert.equal(currentRouteName(), 'wallets.new');
  });
});
