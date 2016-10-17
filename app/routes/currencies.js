import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll("currency");
  },
  actions: {
    openDialog: function (currency) {
      this.get("controller").set('isModalDialogActive', true);
      this.get("controller").set('currency', currency);
    },
    closeDialog: function () {
      this.get("controller").set('isModalDialogActive', false);
    },
    delete: function () {
      this.get('controller.currency').destroyRecord();
      this.get("controller").set('isModalDialogActive', false);
    }
  }
});
