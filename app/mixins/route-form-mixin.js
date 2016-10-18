import Ember from 'ember';

export default Ember.Mixin.create({
  afterSave: function () {
    console.log('Saved');
  },
  model: null,
  actions: {
    save: function () {
      let model = this.get("controller.model");
      model.validate().then(() => {
        if(model.get('isValid')) {
          model.save().then(this.afterSave(model));
        }
      }).catch(function () {
        console.log("Something wrong with model!");
      });
    }
  }
});
