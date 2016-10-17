import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('category', 'Unit | Model | Category', {
  // Specify the other units that are required for this test.
  needs: ['model:outcome', 'model:income']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('Outcomes relationship', function(assert) {
  var Category = this.subject({}).constructor;
  var relationship = Ember.get(Category, 'relationshipsByName').get('outcomes');
  assert.equal(relationship.key, 'outcomes');
  assert.equal(relationship.kind, 'hasMany');
});

test('Incomes relationship', function(assert) {
  var Category = this.subject({}).constructor;
  var relationship = Ember.get(Category, 'relationshipsByName').get('incomes');
  assert.equal(relationship.key, 'incomes');
  assert.equal(relationship.kind, 'hasMany');
});
