import Ember from 'ember';

export default Ember.Component.extend({
  transactions: Ember.computed('transactionsRaw.[]', function () {
    return this.get('transactionsRaw');
  }),
  transactionsRaw: null, //pass
  filterCategoryId: null, //pass

  filterObserver: Ember.observer('filter', 'transactions.[]', function () {
    switch(this.get('filter')) {
      case 'expenses':
        this.set('transactions', this.get('transactions').filterBy('isNegative', true));
        break;
      case 'income':
        this.set('transactions', this.get('transactions').filterBy('isNegative', false));
        break;
      case 'all':
      default: break;
    }
  }),

  actions: {
    didMakeSelection(value) {
      if (value === null) {
        this.set('transactions', this.get('transactionsRaw'));
      } else {
        this.set('transactions', this.get('transactionsRaw').filter(transaction => {
          return transaction.get('category.id') === value;
        }));
      }
      this.set('filterCategoryId', value);
      this.notifyPropertyChange('transactions');
    },
    filterByIsNegative(value) {
      let transactions;
      switch (value) {
        case -1:
          transactions = this.get('transactionsRaw').filterBy('isNegative', true);
          if (this.get('filterCategoryId') !== null) {
            transactions = this._filterByCategoryId(transactions, this.get('filterCategoryId'));
          }
          this.set('transactions', transactions);
          break;
        case 1:
          transactions = this.get('transactionsRaw').filterBy('isNegative', false);
          if (this.get('filterCategoryId') !== null) {
            transactions = this._filterByCategoryId(transactions, this.get('filterCategoryId'));
          }
          this.set('transactions', transactions);
          break;
        case 0:
          transactions = this.get('transactionsRaw');
          if (this.get('filterCategoryId') !== null) {
            transactions = this._filterByCategoryId(transactions, this.get('filterCategoryId'));
          }
          this.set('transactions', transactions);
          break;
        default: break;
      }
      this.notifyPropertyChange('transactions');
    }
  },

  _filterByCategoryId(transactions, categoryId) {
    return transactions.filter(transaction => {
      return transaction.get('category.id') === categoryId;
    });
  }
});
