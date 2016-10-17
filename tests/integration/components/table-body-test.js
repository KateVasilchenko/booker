import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table-body', 'Integration | Component | table body', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{table-body}}`);

  assert.equal(this.$().text().trim().replace(/Load more.../, ''), '');

  // Template block usage:
  this.render(hbs`
    {{#table-body}}
      template block text
    {{/table-body}}
  `);

  assert.equal(this.$().text().trim().replace(/Load more.../g, 'template block text'), 'template block text');
});
