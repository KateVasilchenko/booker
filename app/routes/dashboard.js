import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      transactions: this.store.findAll('transaction')
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('transactions', model.transactions);
    let wallets = this.store.peekAll('wallet');
    model.transactions.forEach(function (transaction) {
      transaction.set('wallet', wallets.get('firstObject'));
    });
    wallets.get('firstObject').set('transactions', model.transactions);
    let balance = 0;
    wallets.forEach(function (wallet) {
      balance += wallet.get('balance');
    });
    controller.set('wallets', wallets);
    controller.set('balance', balance);
  },
});
