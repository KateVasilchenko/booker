import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    willTransition: function () {
      if (this.get("controller.model.isNew")) {
        return this.get("controller.model").destroyRecord();
      }
    }
  }
});
