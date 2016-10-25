import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      wallet: this.store.findAll('wallet'),
      category: this.store.findAll('category'),
    });
  }
});
