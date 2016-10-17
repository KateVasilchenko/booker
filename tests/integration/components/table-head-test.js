import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table-head', 'Integration | Component | table head', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{table-head}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#table-head}}
      template block text
    {{/table-head}}
  `);
  console.log(this.$().text().trim().replace(/ /g, 'template block text'));
  assert.equal(this.$().text().trim().replace(/^/g, 'template block text'), 'template block text');
});
