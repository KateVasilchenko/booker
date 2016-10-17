import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll("category");
  },
  // afterModel(model) {
  //   console.log(model.get('content'));
  //   console.log(model.get('content.firstObject').toJSON());
  // },
  actions: {
    openDialog: function (contentDeleted) {
      this.get("controller").set('isModalDialogActive', true);
      this.get("controller").set('contentDeleted', contentDeleted);
    },
    closeDialog: function () {
      this.get("controller").set('isModalDialogActive', false);
    },
    delete: function () {
      this.get('controller.contentDeleted').destroyRecord();
      this.get("controller").set('isModalDialogActive', false);
    }
  }
});
