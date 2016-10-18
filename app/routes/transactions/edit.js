import Ember from 'ember';
import RouteFormMixin from '../../mixins/route-form-mixin';

export default Ember.Route.extend(RouteFormMixin, {
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
    back: function () {
      return this.transitionTo('transactions');
    },
    isNegativeChanged(value) {
      let model = this.get('controller.model');
      console.log(model);
      if (value === '+') {
        model.set('isNegative', false);
      } else if (value === '-') {
        model.set('isNegative', true);
      }
      console.log(model.get('isNegative'));
    }
  }
});
