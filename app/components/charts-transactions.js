import Ember from 'ember';

export default Ember.Component.extend({
  transactionsFilter: Ember.inject.service(),

  charts: null, // pass
  transactionsRaw: null, // pass

  transactionsObserver: Ember.on('didInsertElement', Ember.observer('transactions.[]', function () {
    console.log('RERENDER');
    console.log(this._state);
    console.log(this._currentState);
    // Ember.run.scheduleOnce('afterRender', this.rerender);
    // this.rerender();
  })),

  transactions: Ember.computed('transactionsRaw.[]',
    function () {
      return this.get('transactionsRaw');
    }
  ),

  actions: {
    filterTransactions(data) {
      this.set('transactions', this.get('transactionsFilter').filterTransactions(
        this.get('transactionsRaw'),
        data
      ));
      //TODO: rerender charts

      this.notifyPropertyChange('transactions');
    }
  }
});
