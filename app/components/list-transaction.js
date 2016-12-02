import Ember from 'ember';

export default Ember.Component.extend({
  transactionsFilter: Ember.inject.service(),
  store: Ember.inject.service(),

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
    console.log('AAAAAAAAAAA');
    return this.get('transactionsRaw').rejectBy('isDeleted');
  }),

  modelToDelete: null,
  isHidden: true,

  actions: {
    cancelDelete() {
      this.set('isHidden', true);
    },
    deleteRecord(model) {
      console.log(model);
      console.log('bbb');
      this.set('isHidden', true);
      model.destroyRecord();
      this.set('modelToDelete', null);
    },
    edit(transaction) {
      let controller = this.get('own').lookup('controller:application');
      if (controller.get('hidden') === false) {
        controller.set('hidden', true);
        controller.get('transaction').destroyRecord();
      } else {
        controller.setProperties({
          'hidden': false,
          'transaction': transaction,
          'categories': this.get('store').peekAll('category'),
          'wallets': this.get('store').peekAll('wallet')
        });
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
