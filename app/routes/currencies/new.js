import Ember from 'ember';
import RouteNewMixin from '../../mixins/route-new-mixin';
import RouteFormMixin from '../../mixins/route-form-mixin';

export default Ember.Route.extend(RouteNewMixin, RouteFormMixin, {
  afterSave: function() {
    this._super();
    return this.transitionTo('currencies');
  },
  model() {
    return this.store.createRecord("currency");
  },
  actions: {
    back: function () {
      return this.transitionTo('currencies');
    }
  }
});
