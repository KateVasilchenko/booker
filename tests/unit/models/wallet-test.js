import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('wallet', 'Unit | Model | Wallet', {
  needs: [
    'model:currency',
    'model:transaction',
    'validator:presence',
    'validator:number',
    'validator:belongs-to'
  ]
});

test('Transactions relationship', function(assert) {
  var Wallet = this.subject({}).constructor;
  var relationship = Ember.get(Wallet, 'relationshipsByName').get('transactions');
  assert.equal(relationship.key, 'transactions');
  assert.equal(relationship.kind, 'hasMany');
});

test('Currency relationship', function(assert) {
  const Wallet = this.store().modelFor('wallet');
  const relationship = Ember.get(Wallet, 'relationshipsByName').get('currency');
  assert.equal(relationship.key, 'currency');
  assert.equal(relationship.kind, 'belongsTo');
});
