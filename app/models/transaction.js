import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr } = DS;

const Validations = buildValidations({
  amount: {
    description: 'Amount',
    validators: [
      validator('presence', true),
      validator('number', {
        allowString: true,
        gt: 0
      })
    ]
  }
});

export default DS.Model.extend(Validations, {
  wallet: DS.belongsTo('wallet', { async: false }),
  category: DS.belongsTo('category', { async: false }),

  description: attr('string'),
  amount: attr('number', { defaultValue: 0.00 }),
  isIncome: attr('boolean', { defaultValue: false }),
  createdAt: attr('date'),
  updatedAt: attr('date')
});
