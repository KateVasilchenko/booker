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

const WALLETS_MOCK = '{"wallets":[{"id":1,"name":"Main"},{"id":2,"name":"Another"}]}';

test('visiting /wallets/new', function(assert) {
  Ember.$.mockjax({
    url: '/api/wallets',
    type: 'GET',
    status: 200,
    responseText: WALLETS_MOCK,
    responseTime: 0
  });

  visit('/wallets/new');

  andThen(function() {
    assert.equal(currentURL(), '/wallets/new');
  });
});
