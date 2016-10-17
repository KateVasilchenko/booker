import Ember from 'ember';
import RouteFormMixin from '../../mixins/route-form-mixin';

export default Ember.Route.extend(RouteFormMixin, {
  afterSave: function() {
    this._super();
    return this.transitionTo('currencies');
  },
  model(params) {
    return this.store.find("currency", params.id);
  },
  actions: {
    back: function () {
      return this.transitionTo('currencies');
    }
  }
});
