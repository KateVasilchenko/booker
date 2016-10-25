import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr } = DS;

const Validations = buildValidations({
  amount: {
    description: 'Amount',
    validators: [
      validator('presence', true),
      validator('format', {
        regex: /^[0-9]*\.?[0-9]*$/,
        message: '{description} must be a number'
      })
    ]
  },
  wallet: {
    description: 'Wallet',
    validators: [
      validator('presence', true)
    ]
  },
  category: {
    description: 'Category',
    validators: [
      validator('presence', true)
    ]
  }
}, {
  debounce: 500
});

export default DS.Model.extend(Validations, {
  wallet: DS.belongsTo('wallet', { async: false }),
  category: DS.belongsTo('category', { async: false }),

  description: attr('string'),
  amount: attr('number', { defaultValue: 0.99 }),
  isNegative: attr('boolean', { defaultValue: false }),
  createdAt: attr('date'),
  updatedAt: attr('date')
});
