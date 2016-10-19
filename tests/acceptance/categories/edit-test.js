import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | categories/edit', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

const CATEGORIES_MOCK = '{"categories":[{"id":1,"name":"Food"},{"id":2,"name":"Drink"},{"id":3,"name":"Entertainment"},{"id":4,"name":"Medicine"},{"id":5,"name":"Tourism"},{"id":6,"name":"Fuel"},{"id":7,"name":"House"},{"id":8,"name":"Children"},{"id":9,"name":"Gifts"},{"id":10,"name":"Games"},{"id":11,"name":"Clothes"}]}';
const CATEGORY_MOCK = '{"categories":[{"id":1,"name":"Food"}]}';

test('visiting /categories/edit/:id', function(assert) {
  Ember.$.mockjax({
    url: '/api/categories',
    type: 'GET',
    status: 200,
    responseText: CATEGORIES_MOCK,
    responseTime: 0
  });

  Ember.$.mockjax({
    url: '/api/categories/1',
    type: 'GET',
    status: 200,
    responseText: CATEGORY_MOCK,
    responseTime: 0
  });

  visit('/categories/edit/1');

  andThen(function() {
    assert.equal(currentURL(), '/categories/edit/1');
  });
});
