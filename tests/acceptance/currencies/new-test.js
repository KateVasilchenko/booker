import { test } from 'qunit';
import moduleForAcceptance from 'booker/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | currencies/new');

test('visiting /currencies/new', function(assert) {
  visit('/currencies/new');

  andThen(function() {
    assert.equal(currentURL(), '/currencies/new');
  });
});
