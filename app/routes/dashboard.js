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
    let balance = null;
    let wallets = this.store.peekAll('wallet');
    for (let i=0; i<wallets.get('length'); i++) {
      balance = balance === null ?
        parseFloat(wallets.objectAt(i).get('balance')) : balance + parseFloat(wallets.objectAt(i).get('balance'));
    }
    controller.set('wallets', wallets);
    controller.set('balance', balance.toFixed(2));
    controller.set('transactions', model.transactions);
  },
});
