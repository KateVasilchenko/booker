import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table-body-row', 'Integration | Component | table body row', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{table-body-row}}`);

  assert.equal(this.$().text().trim().replace(/Edit/g, '' ).replace(/\n/g, '').replace(/ /g, '').replace(/Delete/g, ''), '');

  // Template block usage:
  this.render(hbs`
    {{#table-body-row}}
      template block text
    {{/table-body-row}}
  `);

  assert.equal(this.$().text().trim().replace(/Edit/g, '' ).replace(/\n/g, '').replace(/ /g, '').replace(/Delete/g, ''), '');
});
