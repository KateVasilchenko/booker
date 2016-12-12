import Ember from 'ember';

export default Ember.Route.extend({
  charts: Ember.inject.service(),

  model() {
    return Ember.RSVP.hash({
      wallets: this.store.peekAll('wallet').rejectBy('isDeleted').rejectBy('isNew'),
      balance: this._getTotalBalance(this.store.peekAll('wallet').rejectBy('isDeleted').rejectBy('isNew')),
      transactions: this.store.peekAll('transaction').rejectBy('isDeleted').rejectBy('isNew').filterBy('isLoaded'),
      charts: this.get('charts').prepareData({
        transactions: this.store.peekAll('transaction').rejectBy('isDeleted').rejectBy('isNew'),
        categories: this.store.peekAll('category')
      })
    });
  },

  _getTotalBalance(wallets) {
    let balance = 0;
    wallets.forEach((wallet) => {
      balance += parseFloat(wallet.get('balance'));
    });
    return balance.toFixed(2);
  },
});
