import Ember from 'ember';
import TransactionDdMixinMixin from 'booker/mixins/transaction-dd-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | transaction dd mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let TransactionDdMixinObject = Ember.Object.extend(TransactionDdMixinMixin);
  let subject = TransactionDdMixinObject.create();
  assert.ok(subject);
});
