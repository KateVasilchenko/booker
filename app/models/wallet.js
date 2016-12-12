import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr } = DS;

const Validations = buildValidations({
  name: {
    description: 'Name',
    validators: [
      validator('presence', true)
    ]
  },
  amount: {
    description: 'Amount',
    validators: [
      validator('presence', true),
      validator('number', {
        allowString: true,
        gte: 0
      })
    ]
  },
  currency: validator('belongs-to')
}, {
  debounce: 500
});

export default DS.Model.extend(Validations, {
  currency: DS.belongsTo('currency', { async: false }),
  transactions: DS.hasMany('transaction', { async: true }),

  name: attr('string'),
  amount: attr('number', { defaultValue: 0 }),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  incomeData: null,
  outcomeData: null,
  categories: null,
  monthData: null,
  currentMonthAndYear: null,

  incomeOutcomeObserver: Ember.on('init', Ember.observer(
    'transactions.[]',
    'transactions.@each.amount',
    'amount',
    'balance', function () {
    let outcome = [];
    let income = [];
    let categories = [];

    let now = new Date();
    this.set('currentMonthAndYear', moment(now).format('MMMM YYYY'));

    let monthIncomeData = [];
    let monthOutcomeData = [];

    var daysInMonth = function (month,year) {
      return new Date(year, month, 0).getDate();
    };

    let maxIncomeAmount = 0;
    let maxOutcomeAmount = 0;

    this.get('transactions')
      .rejectBy('isNew').rejectBy('isDeleted').filterBy('isLoaded')
      .filter(function (transaction) {
      return transaction.get('createdAt').getYear() === now.getYear() &&
        transaction.get('createdAt').getMonth() === now.getMonth();
    }).forEach(function (transaction) {
      if (transaction.get('isIncome')) {
        if (transaction.get('amount') > maxIncomeAmount) {
          maxIncomeAmount = transaction.get('amount');
        }
      } else {
        if (transaction.get('amount') > maxOutcomeAmount) {
          maxOutcomeAmount = transaction.get('amount');
        }
      }
    });

    // if (maxIncomeAmount === 0) {
    //   maxIncomeAmount = 1;
    // }
    //
    // if (maxOutcomeAmount === 0) {
    //   maxOutcomeAmount = 1;
    // }

    for (let i=0; i<daysInMonth(now.getYear(), now.getMonth()); i++) {
      categories.push(i);

      let transaction = this.get('transactions')
        .rejectBy('isDeleted').rejectBy('isNew').filterBy('isLoaded')
        .find(function (transaction) {
        return transaction.get('createdAt').getYear() === now.getYear() &&
          transaction.get('createdAt').getMonth() === now.getMonth() &&
          transaction.get('createdAt').getDay() === i;
      });

      if (transaction) {
        if (transaction.get('isIncome')) {
          income.push(transaction.get('amount'));
        } else {
          outcome.push(transaction.get('amount'));
        }
      }

      monthIncomeData.push(maxIncomeAmount);
      monthOutcomeData.push(maxOutcomeAmount);
    }

    this.set('incomeData', income);
    this.set('outcomeData', outcome);
    this.set('monthIncomeData', monthIncomeData);
    this.set('monthOutcomeData', monthOutcomeData);
    this.set('categories', categories);
  })),

  balance: Ember.computed('transactions.[]', 'transactions.@each.amount', 'amount', function () {
    let balance = parseFloat(this.get('amount')) ? parseFloat(this.get('amount')) : 0;
    this.get('transactions').rejectBy('isNew').rejectBy('isDeleted').forEach(function (transaction) {
      if (transaction.get('isIncome')) {
        balance += transaction.get('amount');
      } else {
        balance -= transaction.get('amount');
      }
    });

    return balance.toFixed(2);
  })
});
