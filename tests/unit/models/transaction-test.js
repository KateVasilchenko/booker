import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('transaction', 'Unit | Model | Transaction', {
  needs: ['model:wallet', 'model:category']
});

test('Category relationship', function (assert) {
  var Transaction = this.subject({}).constructor;
  var relationship = Ember.get(Transaction, 'relationshipsByName').get('category');
  assert.equal(relationship.key, 'category');
  assert.equal(relationship.kind, 'belongsTo');
});

test('Wallet relationship', function (assert) {
  var Transaction = this.subject({}).constructor;
  var relationship = Ember.get(Transaction, 'relationshipsByName').get('wallet');
  assert.equal(relationship.key, 'wallet');
  assert.equal(relationship.kind, 'belongsTo');
});
