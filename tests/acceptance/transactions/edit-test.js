import { test } from 'qunit';
import moduleForAcceptance from 'booker/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | transactions/edit');

test('visiting /transactions/edit', function(assert) {
  server.create('transaction');

  visit('/transactions/edit/1');

  andThen(function() {
    assert.equal(currentURL(), '/transactions/edit/1');
  });
});
