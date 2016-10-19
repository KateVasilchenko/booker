import Ember from 'ember';
import RouteFormMixin from '../../mixins/route-form-mixin';

export default Ember.Route.extend(RouteFormMixin, {
  fallbackRoute: 'transactions',
  afterSave: function() {
    this._super();
    return this.transitionTo('transactions');
  },
  model(params) {
    return this.store.find("transaction", params.id);
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('wallets', this.store.peekAll('wallet'));
    controller.set('categories', this.store.peekAll('category'));
  },
  actions: {
    isNegativeChanged(value) {
      let model = this.get('controller.model');
      return value === '+' ? model.set('isNegative', false) : model.set('isNegative', true);
    },
    createdAtChanged(value) {
      this.get('controller.model').set('createdAt', value);
    }
  }
});
