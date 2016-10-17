import Ember from 'ember';

export default Ember.Component.extend({
  for: null, //pass
  model: null, //pass
  errorMessage: function () {
    return this.get("model.errors." + this.get("for"));
  }.property("model.isValid"),
});
