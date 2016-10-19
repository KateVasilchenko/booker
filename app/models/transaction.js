import DS from 'ember-data';
import EmberValidations from "ember-validations";

export default DS.Model.extend(EmberValidations, {
  wallet: DS.belongsTo('wallet', { async: true }),
  category: DS.belongsTo('category', { async: true }),

  description: DS.attr('string'),
  amount: DS.attr('number', { defaultValue: 0.99 }),
  isNegative: DS.attr('boolean', { defaultValue: false }),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  validations: {
    amount: {
      presence: true,
      numericality: true
    },
    wallet: {
      promisePresence: true
    },
    category: {
      promisePresence: true
    }
  }
});
