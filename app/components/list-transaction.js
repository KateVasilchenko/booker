import Ember from 'ember';

export default Ember.Component.extend({
  transactionsFilter: Ember.inject.service(),

  transactionsRaw: null, //pass

  filterCategoryId: null,
  filterIsNegative: 'all',

  filterActive: Ember.observer('filterIsNegative', function () {
      this._setActive(this.get('filterIsNegative'), {
        all: Ember.$('#all'),
        income: Ember.$('#income'),
        expenses: Ember.$('#expenses')
      });
  }),

  transactions: Ember.computed('transactionsRaw.[]', function () {
    return this.get('transactionsRaw');
  }),

  actions: {
    filterByCategory(value) {
      this.get('filterCategoryId') === null ?
        this.set('filterCategoryId', value) : this.set('filterCategoryId', null);

      this.send('filterTransactions', {
        filterCategoryId: this.get('filterCategoryId'),
        filterIsNegative: 'all'
      });
    },
    filterByIsNegative(value) {
      this.set('filterIsNegative', value);
      this.send('filterTransactions', {
        filterCategoryId: this.get('filterCategoryId'),
        filterIsNegative: 'all'
      });
    },
    filterTransactions(data) {
      data['filterCategoryId'] = this.get('filterCategoryId');
      data['filterIsNegative'] = this.get('filterIsNegative');

      this.set('transactions', this.get('transactionsFilter').filterTransactions(
        this.get('transactionsRaw'),
        data
      ));

      this.notifyPropertyChange('transactions');
    }
  },
  didRender() {
    this.filterActive();
    this._super(...arguments);
  },
  init() {
    this._super(...arguments);
    this.send('filterTransactions', {
      filterCategoryId: null,
      filterIsNegative: 'all'
    });
  },
  _setActive(activeElementKey, allElements) {
    for (var key in allElements) {
      if (allElements.hasOwnProperty(key)) {
        if (key === activeElementKey) {
          if (!Ember.$(allElements[activeElementKey]).hasClass('active')) {
            Ember.$(allElements[activeElementKey]).addClass('active');
          }
        } else {
          Ember.$(allElements[key]).removeClass('active');
        }
      }
    }
  }
});
