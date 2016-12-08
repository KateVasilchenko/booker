import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  walletsRaw: null, //pass

  wallets: Ember.computed('walletsRaw.[]', function () {
    return this.get('walletsRaw').rejectBy('isDeleted').rejectBy('isNew');
  }),

  modelToDelete: null,
  isHidden: true,

  actions: {
    cancelDelete() {
      this.set('isHidden', true);
    },
    deleteRecord(model) {
      this.set('isHidden', true);
      this.get('wallets').removeObject(model);
      model.destroyRecord();
      this.set('modelToDelete', null);
    },
    edit(wallet) {
      let controller = this.get('own').lookup('controller:application');

      if (controller.get('transaction')) {
        if (controller.get('transaction.isNew')) {
          controller.get('transaction').destroyRecord();
        }
        controller.set('transaction', null);
        controller.set('hidden', true);
        controller.set('disabledButtons', false);
      }

      if (controller.get('wallet')) {
        if (controller.get('wallet.isNew')) {
          controller.get('wallet').destroyRecord();
        }
        controller.set('wallet', null);
        controller.set('hidden', true);
        controller.set('disabledButtons', false);
      }

      Ember.run.later(this, function () {
        if (!controller.get('disabledButtons')) {
          controller.set('disabledButtons', true);
          controller.set('wallet', wallet);
          controller.set('hidden', false);
        }
      }, 500);
    },
    delete(wallet) {
      this.set('modelToDelete', wallet);
      this.set('isHidden', false);
    }
  }
});
