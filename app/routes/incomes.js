import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll("income");
  },
  actions: {
    openDialog: function (income) {
      this.get("controller").set('isModalDialogActive', true);
      this.get("controller").set('income', income);
    },
    closeDialog: function () {
      this.get("controller").set('isModalDialogActive', false);
    },
    delete: function () {
      this.get('controller.income').destroyRecord();
      this.get("controller").set('isModalDialogActive', false);
    }
  }
});
