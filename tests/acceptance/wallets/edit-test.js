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

const WALLETS_MOCK = '{"wallets":[{"id":1,"name":"Main"},{"id":2,"name":"Another"}]}';
const WALLET_MOCK = '{"wallets":[{"id":1,"name":"Dollars"}]}';

test('visiting /wallets/edit/:id', function(assert) {
  Ember.$.mockjax({
    url: '/api/wallets',
    type: 'GET',
    status: 200,
    responseText: WALLETS_MOCK,
    responseTime: 0
  });

  Ember.$.mockjax({
    url: '/api/wallets/1',
    type: 'GET',
    status: 200,
    responseText: WALLET_MOCK,
    responseTime: 0
  });

  visit('/wallets/edit/1');

  andThen(function() {
    assert.equal(currentURL(), '/wallets/edit/1');
  });
});
