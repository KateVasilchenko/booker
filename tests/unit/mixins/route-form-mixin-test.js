import Ember from 'ember';
import RouteFormMixinMixin from '../../../mixins/route-form-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | route form mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var RouteFormMixinObject = Ember.Object.extend(RouteFormMixinMixin);
  var subject = RouteFormMixinObject.create();
  assert.ok(subject);
});
