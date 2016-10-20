import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  currency: belongsTo(),
  transactions: hasMany()
});
