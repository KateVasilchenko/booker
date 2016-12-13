import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload.categories !== undefined) {
      for (let i=0; i<payload.categories.length; i++) {
        if (payload.categories[i].transactions === undefined &&
          payload.categories[i].transactionIds !== undefined) {
          payload.categories[i].transactions = Ember.copy(payload.categories[i].transactionIds);
          delete payload.categories[i].transactionIds;
        }
      }
    } else if (payload.category !== undefined) {
      if (payload.category.transactions === undefined &&
        payload.category.transactionIds !== undefined) {
        payload.category.transactions = Ember.copy(payload.category.transactionIds);
        delete payload.category.transactionIds;
      }
    }
    return this._super(...arguments);
  },
});
