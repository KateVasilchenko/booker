import Ember from 'ember';
import RouteFormMixin from '../../mixins/route-form-mixin';

export default Ember.Route.extend(RouteFormMixin, {
  afterSave: function() {
    this._super();
    return this.transitionTo('categories');
  },
  model(params) {
    return this.store.find("category", params.id);
  },
  actions: {
    back: function () {
      return this.transitionTo('categories'); 
    }
  }
});
