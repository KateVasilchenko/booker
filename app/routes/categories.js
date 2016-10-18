import Ember from 'ember';
const { computed } = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.findAll("category");
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
      this.transitionTo('categories.edit', entity);
    },
    delete: function (entity) {
      entity.destroyRecord();
      this.get("controller").set('isModalDialogActive', false);
    }
  }
});
