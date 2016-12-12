import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      transactions: this.store.findAll("transaction"),
      own: Ember.getOwner(this),
      categories: this.store.peekAll('category')
    });
  }
});
