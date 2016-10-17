import Ember from 'ember';

export default Ember.Component.extend({
  model: null, //pass
  title: null, //pass
  actions: {
    close: function () {
      return this.sendAction('close');
    },
    delete: function () {
      this.sendAction("delete");
    },
    save: function () {
      this.sendAction('save', this.get('model'));
    }
  }
});
