import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    for (let i=0; i<payload.categories.length; i++) {
      payload.categories[i].transactions = Ember.copy(payload.categories[i].transactionIds);
      delete payload.categories[i].transactionIds;
    }
    return this._super(...arguments);
  },
});
