import Ember from 'ember';

export default Ember.Route.extend({
  charts: Ember.inject.service(),
  model() {
    return Ember.RSVP.hash({
      transactions: this.store.findAll('transaction')
    });
  },
  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties({
      wallets: this.store.peekAll('wallet'),
      balance: this._getTotalBalance(this.store.peekAll('wallet')),
      transactions: model.transactions,
      charts: this.get('charts').prepareData({
        transactions: model.transactions,
        categories: this.store.peekAll('category')
      })
    });
  },
  _getTotalBalance(wallets) {
    let balance = 0;
    for (let i = 0; i < wallets.get('length'); i++) {
      balance += parseFloat(wallets.objectAt(i).get('balance'));
    }
    return balance.toFixed(2);
  }
});
