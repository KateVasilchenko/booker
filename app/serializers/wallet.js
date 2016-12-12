import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    for (let i=0; i<payload.wallets.length; i++) {
      payload.wallets[i].transactions = Ember.copy(payload.wallets[i].transactionIds);
      delete payload.wallets[i].transactionIds;
    }
    return this._super(...arguments);
  },
});
