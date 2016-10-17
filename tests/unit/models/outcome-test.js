import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('outcome', 'Unit | Model | Outcome', {
  // Specify the other units that are required for this test.
  needs: ['model:wallet', 'model:category']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('Category relationship', function (assert) {
  var Outcome = this.subject({}).constructor;
  var relationship = Ember.get(Outcome, 'relationshipsByName').get('category');
  assert.equal(relationship.key, 'category');
  assert.equal(relationship.kind, 'belongsTo');
});

test('Wallet relationship', function (assert) {
  var Outcome = this.subject({}).constructor;
  var relationship = Ember.get(Outcome, 'relationshipsByName').get('wallet');
  assert.equal(relationship.key, 'wallet');
  assert.equal(relationship.kind, 'belongsTo');
});
