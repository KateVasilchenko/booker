import Ember from 'ember';
import RouteNewMixin from '../../mixins/route-new-mixin';
import RouteFormMixin from '../../mixins/route-form-mixin';

export default Ember.Route.extend(RouteNewMixin, RouteFormMixin, {
  afterSave: function() {
    this._super();
    return this.transitionTo('transactions');
  },
  model() {
    return this.store.createRecord("transaction", {
      createdAt: new Date()
    });
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
      return value === '+' ? model.set('isNegative', false) : model.set('isNegative', true);
    },
    createdAtChanged(value) {
      this.get('controller.model').set('createdAt', value);
    }
  }
});
