import { test } from 'qunit';
import moduleForAcceptance from 'booker/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | currencies/edit');

test('visiting /currencies/edit', function(assert) {
  server.create('currency');

  visit('/currencies/edit/1');

  andThen(function() {
    assert.equal(currentURL(), '/currencies/edit/1');
  });
});
