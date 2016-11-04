import Ember from 'ember';
const { computed } = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.findAll("transaction");
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('transactions', model);
    controller.set('categories', this.store.peekAll('category'));
  },
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
