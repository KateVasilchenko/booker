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
        gt: 0
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

  balance: Ember.computed('transactions.[]', 'transactions.@each.amount', 'amount', function () {
    let balance = parseFloat(this.get('amount')) ? parseFloat(this.get('amount')) : 0;
    this.get('transactions').forEach(function (transaction) {
      if (transaction.get('isIncome')) {
        balance += transaction.get('amount');
      } else {
        balance -= transaction.get('amount');
      }
    });
    return balance.toFixed(2);
  })
});
