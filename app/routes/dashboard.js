import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      transactions: this.store.findAll('transaction')
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    model.transactions.forEach((transaction, index) => {
      let wallet = this.store.peekRecord('wallet', index+1);
      let category = this.store.peekRecord('category', index+1);
      transaction.set('wallet', wallet);
      transaction.set('category', category);
      category.set('transactions', [transaction]);
      wallet.set('transactions', [transaction]);
    });
    let balance = 0;
    let wallets = this.store.peekAll('wallet');
    wallets.forEach(function (wallet) {
      balance += wallet.get('balance');
    });
    controller.set('wallets', wallets);
    controller.set('balance', balance);
    controller.set('transactions', model.transactions);
  },
});
