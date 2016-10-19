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

const CURRENCIES_MOCK = '{"currencies":[{"id":1,"name":"Ukrainian Hryvnia","sign":"HR"},{"id":2,"name":"US Dollar","sign":"$"}]}';

test('visiting /currencies', function(assert) {
  Ember.$.mockjax({
    url: '/api/currencies',
    type: 'GET',
    status: 200,
    responseText: CURRENCIES_MOCK,
    responseTime: 0
  });

  visit('/currencies');

  andThen(function() {
    assert.equal(currentURL(), '/currencies');
  });
});
