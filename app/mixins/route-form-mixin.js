import Ember from 'ember';

export default Ember.Mixin.create({
  afterSave: function () {
    console.log('Saved');
  },
  model: null,
  actions: {
    save: function () {
      var self = this;
      var model = this.get("controller.model");
      model.validate().then(function () {
        if(model.get('isValid')) {
          model.save().then(self.afterSave(model));
        }
      }).catch(function () {
        console.log("Something wrong with model!");
      });
    }
  }
});
