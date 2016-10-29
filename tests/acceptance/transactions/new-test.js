import { test } from 'qunit';
import moduleForAcceptance from 'booker/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | transactions/new');

test('visiting /transactions/new', function(assert) {
  visit('/transactions/new');

  andThen(function() {
    assert.equal(currentURL(), '/transactions/new');
  });
});
