import Ember from 'ember';
import RouteNewMixin from '../../mixins/route-new-mixin';
import RouteFormMixin from '../../mixins/route-form-mixin';

export default Ember.Route.extend(RouteNewMixin, RouteFormMixin, {
  afterSave: function() {
    this._super();
    return this.transitionTo('wallets');
  },
  model() {
    return this.store.createRecord("wallet");
  },
  actions: {
    back: function () {
      return this.transitionTo('wallets');
    }
  }
});
