import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  wallet: belongsTo(),
  category: belongsTo()
});
