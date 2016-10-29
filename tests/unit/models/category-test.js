import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('category', 'Unit | Model | Category', {
  needs: ['model:transaction', 'validator:presence']
});

test('Transactions relationship', function(assert) {
  var Category = this.subject({}).constructor;
  var relationship = Ember.get(Category, 'relationshipsByName').get('transactions');
  assert.equal(relationship.key, 'transactions');
  assert.equal(relationship.kind, 'hasMany');
});
