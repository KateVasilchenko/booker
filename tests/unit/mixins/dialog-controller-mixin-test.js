import Ember from 'ember';
import DialogControllerMixinMixin from 'booker/mixins/dialog-controller-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | dialog controller mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let DialogControllerMixinObject = Ember.Object.extend(DialogControllerMixinMixin);
  let subject = DialogControllerMixinObject.create();
  assert.ok(subject);
});
