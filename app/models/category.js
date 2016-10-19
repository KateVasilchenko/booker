import DS from 'ember-data';
import EmberValidations from "ember-validations";

export default DS.Model.extend(EmberValidations, {
  transactions: DS.hasMany('transaction', { async: true }),

  name: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  validations: {
    name: {
      presence: true
    }
  }
});
