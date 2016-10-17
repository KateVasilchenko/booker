import Ember from 'ember';

export default Ember.Component.extend({
  content: null, //pass array of objects
  columnsNames: function () {
    return Ember.keys(this.get("content.firstObject").toJSON());
  }.property("content"),
  actions: {
    deleteEntity: function (contentDeleted) {
      this.sendAction("deleteEntity", contentDeleted); //pass content
    }
  }
});
