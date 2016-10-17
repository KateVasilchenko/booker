import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('wallet', 'Unit | Model | Wallet', {
  // Specify the other units that are required for this test.
  needs: ['model:currency', 'model:outcome', 'model:income']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('Outcomes relationship', function(assert) {
  var Wallet = this.subject({}).constructor;
  var relationship = Ember.get(Wallet, 'relationshipsByName').get('outcomes');
  assert.equal(relationship.key, 'outcomes');
  assert.equal(relationship.kind, 'hasMany');
});

test('Incomes relationship', function(assert) {
  var Wallet = this.subject({}).constructor;
  var relationship = Ember.get(Wallet, 'relationshipsByName').get('incomes');
  assert.equal(relationship.key, 'incomes');
  assert.equal(relationship.kind, 'hasMany');
});

test('Currency relationship', function(assert) {
  const Wallet = this.store().modelFor('wallet');
  const relationship = Ember.get(Wallet, 'relationshipsByName').get('currency');
  assert.equal(relationship.key, 'currency');
  assert.equal(relationship.kind, 'belongsTo');
});
