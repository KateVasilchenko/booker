import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload.wallets !== undefined) {
      for (let i=0; i<payload.wallets.length; i++) {
        if (payload.wallets[i].transactions === undefined &&
          payload.wallets[i].transactionIds !== undefined) {
          payload.wallets[i].transactions = Ember.copy(payload.wallets[i].transactionIds);
          delete payload.wallets[i].transactionIds;
        }
      }
    } else if (payload.wallet !== undefined) {
      if (payload.wallet.transactions === undefined &&
        payload.wallet.transactionIds !== undefined) {
        payload.wallet.transactions = Ember.copy(payload.wallet.transactionIds);
        delete payload.wallet.transactionIds;
      }
    }
    return this._super(...arguments);
  },
});
