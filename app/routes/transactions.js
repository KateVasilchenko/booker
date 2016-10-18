import Ember from 'ember';
const { computed } = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.findAll("transaction");
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('columns', this.get('columns'));
  },
  columns: computed(function() {
    return [
      {
        label: 'Amount',
        valuePath: 'amount',
        sortable: false,
      },
      {
        label: 'Description',
        valuePath: 'description',
        sortable: false,
      },
      {
        label: 'Is Negative',
        valuePath: 'isNegative',
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
      this.transitionTo('transactions.edit', entity);
    },
    delete: function (entity) {
      if (confirm('Are you sure')) {
        entity.destroyRecord();
      }
    }
  }
});
