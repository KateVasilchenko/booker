import Ember from 'ember';

export default Ember.Component.extend({
  values:null,
  content: null, //pass object instance
  contentObserver: Ember.on('init', Ember.observer('content.name', 'content.icon', function() {
    var name = this.get("content.name");
    var icon = this.get("content.icon");
    var arrayOfValues = [];
    arrayOfValues.push(name, icon);
    return this.set("values", arrayOfValues);
    // return this.set("values", this.get("content.name"));
    // return this.set("content", this.get("content").toJSON());
    //TODO:
    //1. Get content.
    //2. Make it have only attributes/values we need (described in model).
  })),
  actions: {
    deleteEntity: function () {
      this.sendAction("deleteEntity", this.get('content')); //pass content
    }
  }
});
