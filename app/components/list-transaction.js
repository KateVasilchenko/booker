import Ember from 'ember';

export default Ember.Component.extend({
  transactionsFilter: Ember.inject.service(),
  store: Ember.inject.service(),

  transactionsRaw: null, //pass

  filterCategoryId: null,
  filterIsIncome: 'all',

  filterActive: Ember.observer('filterIsIncome', function () {
    this._setActive(this.get('filterIsIncome'), {
      all: Ember.$('#all'),
      income: Ember.$('#income'),
      expenses: Ember.$('#expenses')
    });
  }),

  transactions: Ember.computed('transactionsRaw.[]', function () {
    return this.get('transactionsRaw').rejectBy('isDeleted');
  }),

  modelToDelete: null,
  isHidden: true,

  actions: {
    cancelDelete() {
      this.set('isHidden', true);
    },
    deleteRecord(model) {
      this.set('isHidden', true);
      this.get('transactions').removeObject(model);
      model.destroyRecord();
      this.set('modelToDelete', null);
    },
    edit(transaction) {
      let controller = this.get('own').lookup('controller:application');

      if (!controller.get('disabledButtons')) {
        controller.set('disabledButtons', true);
        controller.setProperties({
          'transaction': transaction,
          'categories': this.get('store').peekAll('category'),
          'wallets': this.get('store').peekAll('wallet')
        });
        controller.set('hidden', false);
      }
    },
    delete(transaction) {
      this.set('modelToDelete', transaction);
      this.set('isHidden', false);
    },
    filterByCategory(value) {
      this.get('filterCategoryId') === null ?
        this.set('filterCategoryId', value) : this.set('filterCategoryId', null);

      this.send('filterTransactions', {
        filterCategoryId: this.get('filterCategoryId'),
        filterIsIncome: 'all'
      });
    },
    filterByIsIncome(value) {
      this.set('filterIsIncome', value);
      this.send('filterTransactions', {
        filterCategoryId: this.get('filterCategoryId'),
        filterIsIncome: 'all'
      });
    },
    filterTransactions(data) {
      data['filterCategoryId'] = this.get('filterCategoryId');
      data['filterIsIncome'] = this.get('filterIsIncome');

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
      filterIsIncome: 'all'
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
