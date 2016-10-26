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
  currency: validator('belongs-to')
}, {
  debounce: 500
});

export default DS.Model.extend(Validations, {
  currency: DS.belongsTo('currency', { async: false }),
  transactions: DS.hasMany('transaction', { async: true }),

  name: attr('string'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  balance: Ember.computed('transactions.[]', 'transactions.@each.amount', function () {
    let balance = 0;
    this.get('transactions').forEach(function (transaction) {
      if (transaction.get('isNegative')) {
        balance -= transaction.get('amount');
      } else {
        balance += transaction.get('amount');
      }
    });
    return balance.toFixed(2);
  })
});
