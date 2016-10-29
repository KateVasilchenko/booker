import { test } from 'qunit';
import moduleForAcceptance from 'booker/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | categories/edit');

test('visiting /categories/edit', function(assert) {
  server.create('category');

  visit('/categories/edit/1');

  andThen(function() {
    assert.equal(currentURL(), '/categories/edit/1');
  });
});
