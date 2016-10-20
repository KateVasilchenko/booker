import Ember from 'ember';
const { computed } = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.findAll('wallet');
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('columns', this.get('columns'));
  },
  columns: computed(function() {
    return [
      {
        label: 'Name',
        valuePath: 'name',
        sortable: false,
      },
      {
        sortable: false,
        cellComponent: 'cell-actions'
      }
    ];
  }),
  actions: {
    edit(entity) {
      this.transitionTo('wallets.edit', entity);
    },
    delete: function (entity) {
      if (confirm('Are you sure')) {
        entity.destroyRecord();
      }
    }
  }
});
