import DS from 'ember-data';
import EmberValidations from "ember-validations";

export default DS.Model.extend(EmberValidations, {
  name: DS.attr(),
  balance: DS.attr(),
  currency: DS.belongsTo('currency', {
    async: true
  }),
  transactions: DS.hasMany('transaction', {
    async: true
  }),
  validations: {
    name: {
      presence: true
    },
    balance: {
      presence: true
    }
  }
});
