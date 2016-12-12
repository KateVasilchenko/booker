import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      wallets: this.store.findAll("wallet"),
      own: Ember.getOwner(this)
    });
  }
});
