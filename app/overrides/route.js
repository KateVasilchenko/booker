import Ember from 'ember';

export default Ember.Route.reopen({
  deactivate: function() {
    this._super(...arguments);
    const owner = Ember.getOwner(this);
    let controller = owner.lookup('controller:application');

    if (controller.get('transaction')) {
      if (controller.get('transaction.isNew')) {
        controller.get('transaction').destroyRecord();
      }
      controller.set('transaction', null);
    }

    if (controller.get('wallet')) {
      if (controller.get('wallet.isNew')) {
        controller.get('wallet').destroyRecord();
      }
      controller.set('wallet', null);
    }

    controller.set('disabledButtons', false);
    controller.set('hidden', true);
  },
});
