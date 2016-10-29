import { test } from 'qunit';
import moduleForAcceptance from 'booker/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | wallets/new');

test('visiting /wallets/new', function(assert) {
  visit('/wallets/new');

  andThen(function() {
    assert.equal(currentURL(), '/wallets/new');
  });
});
