import DS from 'ember-data';
import EmberValidations from "ember-validations";

export default DS.Model.extend(EmberValidations, {
  name: DS.attr('string'),
  sign: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  validations: {
    name: {
      presence: true
    },
    sign: {
      presence: true
    }
  }
});
