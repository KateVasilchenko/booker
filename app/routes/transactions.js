import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll("transaction");
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('own', Ember.getOwner(this));
    controller.set('transactions', model);
    controller.set('categories', this.store.peekAll('category'));
  }
});
