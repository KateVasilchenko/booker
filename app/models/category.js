import DS from 'ember-data';
import EmberValidations from "ember-validations";

export default DS.Model.extend(EmberValidations, {
  name: DS.attr(),
  icon: DS.attr(),
  transactions: DS.hasMany('transaction', {
    async: true
  }),
  validations: {
    name: {
      presence: true
    },
    icon: {
      presence: true
    }
  }
});
