import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll("outcome");
  },
  actions: {
    openDialog: function (outcome) {
      this.get("controller").set('isModalDialogActive', true);
      this.get("controller").set('outcome', outcome);
    },
    closeDialog: function () {
      this.get("controller").set('isModalDialogActive', false);
    },
    delete: function () {
      this.get('controller.outcome').destroyRecord();
      this.get("controller").set('isModalDialogActive', false);
    }
  }
});
