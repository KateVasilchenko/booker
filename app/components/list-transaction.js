import Ember from 'ember';

export default Ember.Component.extend({
  transactionsFilter: Ember.inject.service(),
  store: Ember.inject.service(),

  transactionsRaw: null, //pass

  categories: Ember.computed(function () {
    return this.get('store').peekAll('category');
  }),

  filterCategoryId: null,
  filterIsIncome: 'all',
  filterIsTime: 'month',
  periodChosen: null,

  filterActive: Ember.observer('filterIsIncome', function () {
    this._setActive(this.get('filterIsIncome'), {
      all: Ember.$('#all'),
      income: Ember.$('#income'),
      expenses: Ember.$('#expenses')
    });
  }),

  transactions: Ember.computed(
    'transactionsRaw.[]', 'transactionsRaw.each@.isDeleted',
    'transactionsRaw.each@.isNew', 'transactionsRaw.each@.createdAt',
    function () {
      return this.get('transactionsRaw')
        .rejectBy('isDeleted').rejectBy('isNew');
  }),

  transactionsSorted: Ember.computed.sort('transactions', 'transactionsSorting'),
  transactionsSorting: ['createdAt:desc'],

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

      if (controller.get('transaction')) {
        if (controller.get('transaction.isNew')) {
          controller.get('transaction').destroyRecord();
        }
        controller.set('transaction', null);
        controller.set('hidden', true);
        controller.set('disabledButtons', false);
      }

      if (controller.get('wallet')) {
        if (controller.get('wallet.isNew')) {
          controller.get('wallet').destroyRecord();
        }
        controller.set('wallet', null);
        controller.set('hidden', true);
        controller.set('disabledButtons', false);
      }

      Ember.run.later(this, function () {
        if (!controller.get('disabledButtons')) {
          controller.set('disabledButtons', true);
          controller.setProperties({
            'transaction': transaction,
            'categories': this.get('store').peekAll('category'),
            'wallets': this.get('store').peekAll('wallet')
          });
          controller.set('hidden', false);
        }
      }, 500);
    },
    delete(transaction) {
      this.set('modelToDelete', transaction);
      this.set('isHidden', false);
    },
    filterByCategory(value) {
      this.set('filterCategoryId', value);

      this.send('filterTransactions', {
        filterCategoryId: this.get('filterCategoryId'),
        filterIsIncome: this.get('filterIsIncome'),
        filterIsTime: this.get('filterIsTime'),
        periodChosen: this.get('periodChosen')
      });
    },
    filterByIsIncome(value) {
      this.set('filterIsIncome', value);
      this.send('filterTransactions', {
        filterCategoryId: this.get('filterCategoryId'),
        filterIsIncome: value,
        filterIsTime: this.get('filterIsTime'),
        periodChosen: this.get('periodChosen')
      });
    },
    filterTransactions(data) {
      data['filterCategoryId'] = this.get('filterCategoryId');
      data['filterIsIncome'] = this.get('filterIsIncome');

      this.set('filterIsIncome', data['filterIsIncome']);
      this.set('filterIsTime', data['filterIsTime']);
      this.set('periodChosen', data['periodChosen']);

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
    let filterIsIncome = 'all';
    if (this.get('con.isIncome') !== undefined) {
      if (this.get('con.isIncome') === 'false') {
        filterIsIncome = 'expenses';
      } else if (this.get('con.isIncome') === 'true') {
        filterIsIncome = 'income';
      }
    }
    this.set('filterIsIncome', filterIsIncome);
    this.get('con').set('isIncome', null);
    this.send('filterTransactions', {});
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
