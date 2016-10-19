import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
      createdAtSelected(value) {
        this.send('createdAtChanged', value);
      }
  }
});
