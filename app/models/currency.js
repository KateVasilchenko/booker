import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr } = DS;

const Validations = buildValidations({
  name: {
    description: 'Name',
    validators: [
      validator('presence', true)
    ]
  },
  sign: {
    description: 'Sign',
    validators: [
      validator('presence', true)
    ]
  },
}, {
  debounce: 500
});

export default DS.Model.extend(Validations, {
  name: attr('string'),
  sign: attr('string'),
  createdAt: attr('date'),
  updatedAt: attr('date')
});
