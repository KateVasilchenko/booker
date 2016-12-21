import Ember from 'ember';

export default Ember.Component.extend({
  transactionsFilter: Ember.inject.service(),
  chartsService: Ember.inject.service('charts'),
  store: Ember.inject.service(),
  charts: null, // pass
  transactionsRaw: null, // pass

  drawCharts: true,

  transactions: Ember.computed('transactionsRaw.[]', function () {
      console.log('Transactions RAW changed');
      return this.get('transactionsRaw');
  }),

  actions: {
    filterTransactions(data) {
      Ember.run.once(() => {
        this.set('transactions', this.get('transactionsFilter').filterTransactions(
          this.get('transactionsRaw'),
          data
        ));

        this.set('charts', this.get('chartsService').prepareData({
          transactions: this.get('transactions'),
          categories: this.get('store').peekAll('category')
        }));

        this.notifyPropertyChange('transactions');
        this.set('drawCharts', false);
        Ember.run.later(() => {
          this.set('drawCharts',true)
        }, 1);
      });
    }
  }
});
