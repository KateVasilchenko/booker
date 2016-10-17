import DS from 'ember-data';
import EmberValidations from "ember-validations";

export default DS.Model.extend(EmberValidations, {
  name: DS.attr(),
  balance: DS.attr(),
  currency: DS.belongsTo('currency'),
  outcomes: DS.hasMany('outcome'),
  incomes: DS.hasMany('income'),
  validations: {
    name: {
      presence: true
    },
    balance: {
      presence: true
    }
  }
});
