import Ember from 'ember';

export default Ember.Component.extend({
  model: null, //pass
  title: null, //pass
  hidden: true, //pass
  actions: {
    close: function () {
      return this.sendAction('close');
    },
    save: function () {
      this.sendAction('save', this.get('model'));
    }
  }
});
