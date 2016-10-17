import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll("wallet");
  },
  // afterModel(model) {
  //   var ico = model.get('content')[0];
  //   console.log(ico);
  // },
  actions: {
    openDialog: function (wallet) {
      this.get("controller").set('isModalDialogActive', true);
      this.get("controller").set('wallet', wallet);
    },
    closeDialog: function () {
      this.get("controller").set('isModalDialogActive', false);
    },
    delete: function () {
      this.get('controller.wallet').destroyRecord();
      this.get("controller").set('isModalDialogActive', false);
    }
  }
});
