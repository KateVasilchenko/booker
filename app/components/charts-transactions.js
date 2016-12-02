import Ember from 'ember';

export default Ember.Component.extend({
  transactionsFilter: Ember.inject.service(),
  chartsService: Ember.inject.service('charts'),
  store: Ember.inject.service(),
  charts: null, // pass
  transactionsRaw: null, // pass

  transactionsObserver: Ember.on('didInsertElement', Ember.observer('transactions.[]', function () {
    console.log(this.get('transactions.length'));
    console.log('RERENDER');
    console.log(this._state);
    if ('inDom' === this._state) {
      this.rerender();
    }
  })),

  transactions: Ember.computed('transactionsRaw.[]', function () {
      return this.get('transactionsRaw');
  }),

  actions: {
    filterTransactions(data) {
      this.set('transactions', this.get('transactionsFilter').filterTransactions(
        this.get('transactionsRaw'),
        data
      ));

      //TODO: rerender charts

      this.set('charts', this.get('chartsService').prepareData({
        transactions: this.get('transactions'),
        categories: this.get('store').peekAll('category')
      }));

      this.notifyPropertyChange('transactions');
    }
  }
});
