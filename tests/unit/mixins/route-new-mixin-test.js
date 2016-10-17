import Ember from 'ember';
import RouteNewMixinMixin from '../../../mixins/route-new-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | route new mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var RouteNewMixinObject = Ember.Object.extend(RouteNewMixinMixin);
  var subject = RouteNewMixinObject.create();
  assert.ok(subject);
});
