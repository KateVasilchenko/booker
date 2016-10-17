import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('income', 'Unit | Model | Income', {
  // Specify the other units that are required for this test.
  needs: ['model:wallet', 'model:category']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('Category relationship', function (assert) {
  var Income = this.subject({}).constructor;
  var relationship = Ember.get(Income, 'relationshipsByName').get('category');
  assert.equal(relationship.key, 'category');
  assert.equal(relationship.kind, 'belongsTo');
});

test('Wallet relationship', function (assert) {
  var Income = this.subject({}).constructor;
  var relationship = Ember.get(Income, 'relationshipsByName').get('wallet');
  assert.equal(relationship.key, 'wallet');
  assert.equal(relationship.kind, 'belongsTo');
});
