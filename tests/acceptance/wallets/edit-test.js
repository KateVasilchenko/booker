import { test } from 'qunit';
import moduleForAcceptance from 'booker/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | wallets/edit');

test('visiting /wallets/edit', function(assert) {
  server.create('wallet');

  visit('/wallets/edit/1');

  andThen(function() {
    assert.equal(currentURL(), '/wallets/edit/1');
  });
});
