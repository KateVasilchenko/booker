import Ember from 'ember';

export default Ember.Route.extend({
  charts: Ember.inject.service(),

  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties({
      wallets: this.store.peekAll('wallet').rejectBy('isDeleted').rejectBy('isNew'),
      balance: this._getTotalBalance(this.store.peekAll('wallet').rejectBy('isDeleted').rejectBy('isNew')),
      transactions: this.store.peekAll('transaction').rejectBy('isDeleted').rejectBy('isNew'),
      charts: this.get('charts').prepareData({
        transactions: this.store.peekAll('transaction').rejectBy('isDeleted').rejectBy('isNew'),
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
