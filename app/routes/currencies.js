import Ember from 'ember';
const { computed } = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.findAll("currency");
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
        label: 'Icon',
        valuePath: 'icon',
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
      this.transitionTo('currencies.edit', entity);
    },
    delete: function (entity) {
      if (confirm('Are you sure')) {
        entity.destroyRecord();
      }
    }
  }
});
