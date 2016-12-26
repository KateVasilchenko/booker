import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      transactions: this.store.peekAll("transaction"),
      own: Ember.getOwner(this),
    });
  }
});
