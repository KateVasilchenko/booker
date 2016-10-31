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
    let wallets = this.store.peekAll('wallet');
    model.transactions.forEach((transaction, index) => {
      let wallet = index % 2 === 0 ? wallets.get('firstObject') : wallets.get('lastObject');
      let category = this.store.peekRecord('category', index + 1);
      transaction.set('wallet', wallet);
      transaction.set('category', category);
      category.set('transactions', [transaction]);
      wallet.get('transactions').pushObject(transaction);
    });
    controller.setProperties({
      wallets: wallets,
      balance: this._getTotalBalance(wallets),
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
