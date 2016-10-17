import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('table-grid', 'Integration | Component | table grid', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  var testObject = Ember.Object.create({
    toJSON: function () {
      return JSON.stringify({someProperty: this.get("someProperty")});
    },
    someProperty: "someValue"
  });
  this.arrayOfObjects = [];
  this.arrayOfObjects.pushObject(testObject);
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{table-grid content=arrayOfObjects}}`);

  assert.equal(this.$().text().trim().replace(/[0-9]/g, '').replace(/\n/g, '').replace(/ /g, '').replace(/EditDeleteLoadmore.../g, ''), '');

  // Template block usage:
  this.render(hbs`
    {{#table-grid content=arrayOfObjects}}
      template block text
    {{/table-grid}}
  `);

  assert.equal(this.$().text().trim().replace(/[0-9]/g, '').replace(/\n/g, '').replace(/ /g, '').replace(/EditDeleteLoadmore.../g, '').replace(/^/g, 'template block text'), 'template block text');
});
