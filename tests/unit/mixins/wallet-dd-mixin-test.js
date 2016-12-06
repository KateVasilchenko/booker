import Ember from 'ember';
import WalletDdMixinMixin from 'booker/mixins/wallet-dd-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | wallet dd mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let WalletDdMixinObject = Ember.Object.extend(WalletDdMixinMixin);
  let subject = WalletDdMixinObject.create();
  assert.ok(subject);
});
