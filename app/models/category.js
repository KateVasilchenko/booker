import DS from 'ember-data';
import EmberValidations from "ember-validations";

export default DS.Model.extend(EmberValidations, {
  name: DS.attr(),
  icon: DS.attr(),
  outcomes: DS.hasMany('outcome'),
  incomes: DS.hasMany('income'),
  validations: {
    name: {
      presence: true
    },
    icon: {
      presence: true
    }
  }
});
