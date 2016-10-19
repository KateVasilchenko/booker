import Ember from 'ember';
import RouteNewMixin from '../../mixins/route-new-mixin';
import RouteFormMixin from '../../mixins/route-form-mixin';

export default Ember.Route.extend(RouteNewMixin, RouteFormMixin, {
  fallbackRoute: 'currencies',
  afterSave: function() {
    this._super();
    return this.transitionTo('currencies');
  },
  model() {
    return this.store.createRecord("currency");
  }
});
