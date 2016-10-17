import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modal-window', 'Integration | Component | modal window', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modal-window}}`);

  assert.equal(this.$().text().trim().replace(/\n/g, '').replace(/ /g, ''), '×CancelSavechanges');

  // Template block usage:
  this.render(hbs`
    {{#modal-window}}
      template block text
    {{/modal-window}}
  `);

  assert.equal(this.$().text().trim().replace(/\n/g, '').replace(/ /g, '').replace(/×/i, '').replace(/CancelSavechanges/i, '' ), 'templateblocktext');
});
