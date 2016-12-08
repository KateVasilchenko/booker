import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  walletsRaw: null, //pass

  wallets: Ember.computed('walletsRaw.[]', function () {
    return this.get('walletsRaw').rejectBy('isDeleted');
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

      if (!controller.get('disabledButtons')) {
        controller.set('disabledButtons', true);
        controller.set('wallet', wallet);
        controller.set('hidden', false);
      }
    },
    delete(wallet) {
      this.set('modelToDelete', wallet);
      this.set('isHidden', false);
    }
  }
});
