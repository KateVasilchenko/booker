import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | wallets', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

// const WALLETS_MOCK = '{"wallets":[{"id":1,"name":"Main","balance":100},{"id":2,"name":"Another","balance":200}]}';

test('visiting /wallets', function(assert) {
  server.createList('wallet', 10);

  visit('/wallets');

  andThen(function() {
    assert.equal(currentURL(), '/wallets');
  });
});
