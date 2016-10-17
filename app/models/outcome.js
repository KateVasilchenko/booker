import DS from 'ember-data';
import EmberValidations from "ember-validations";

export default DS.Model.extend(EmberValidations, {
  name: DS.attr(),
  amount: DS.attr(),
  wallet: DS.belongsTo('wallet', { async: true }),
  category: DS.belongsTo('category', { async: true }),
  validations: {
    name: {
      presence: true
    },
    amount: {
      presence: true
    }
  }
});
