import { test } from 'qunit';
import moduleForAcceptance from 'booker/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | categories/new');

test('visiting /categories/new', function(assert) {
  visit('/categories/new');

  andThen(function() {
    assert.equal(currentURL(), '/categories/new');
  });
});
