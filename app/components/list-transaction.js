import Ember from 'ember';

export default Ember.Component.extend({
  transactionsFilter: Ember.inject.service(),
  transactions: Ember.computed('transactionsRaw.[]', function () {
    return this.get('transactionsRaw');
  }),
  transactionsRaw: null, //pass
  filterCategoryId: null,
  filterIsNegative: null,
  filterIsTime: null,
  periodName: 'year',
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
    filterByCategory(value) {
      this.get('filterCategoryId') === null ?
        this.set('filterCategoryId', value) : this.set('filterCategoryId', null);

      this.send('filterTransactions');
    },
    filterByTime(value) {
      this.get('filterIsTime') === null ?
        this.set('filterIsTime', value) : this.set('filterIsTime', null);
      this._setActive(value, {
        week: Ember.$('#week'),
        month: Ember.$('#month'),
        year: Ember.$('#year')
      });
      this.send('filterTransactions');
    },
    filterByIsNegative(value) {
      this.get('filterIsNegative') === null ?
        this.set('filterIsNegative', value) : this.set('filterIsNegative', null);
      this._setActive(value, {
        all: Ember.$('#all'),
        income: Ember.$('#income'),
        expenses: Ember.$('#expenses')
      });
      this.send('filterTransactions');
    },
    changePeriod(direction) {
      //TODO:
    },
    filterTransactions() {
      this.set('transactions', this.get('transactionsFilter').filterTransactions(
        this.get('transactionsRaw'),
        {
          filterCategoryId: this.get('filterCategoryId'),
          filterIsNegative: this.get('filterIsNegative'),
          filterIsTime: this.get('filterIsTime')
        }
      ));
      this.notifyPropertyChange('transactions');
    }
  },
  _setActive(activeElementKey, allElements) {
    for (var key in allElements) {
      if (allElements.hasOwnProperty(key)) {
        if (key === activeElementKey) {
          if (Ember.$(allElements[activeElementKey]).hasClass('active')) {
            Ember.$(allElements[activeElementKey]).removeClass('active');
          } else {
            Ember.$(allElements[activeElementKey]).addClass('active');
          }
        } else {
          Ember.$(allElements[key]).removeClass('active');
        }
      }
    }
  }
});
