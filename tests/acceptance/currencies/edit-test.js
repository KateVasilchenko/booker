import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | currencies/edit', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

const CURRENCIES_MOCK = '{"currencies":[{"id":1,"name":"Ukrainian Hryvnia","sign":"HR"},{"id":2,"name":"US Dollar","sign":"$"}]}';
const CURRENCY_MOCK = '{"currencies":[{"id":2,"name":"US Dollar","sign":"$"}]}';

test('visiting /currencies/edit/:id', function(assert) {
  Ember.$.mockjax({
    url: '/api/currencies',
    type: 'GET',
    status: 200,
    responseText: CURRENCIES_MOCK,
    responseTime: 0
  });

  Ember.$.mockjax({
    url: '/api/currencies/1',
    type: 'GET',
    status: 200,
    responseText: CURRENCY_MOCK,
    responseTime: 0
  });

  visit('/currencies/edit/1');

  andThen(function() {
    assert.equal(currentURL(), '/currencies/edit/1');
  });
});
