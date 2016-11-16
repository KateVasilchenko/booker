import Ember from 'ember';

export default Ember.Mixin.create({
  afterSave: function () {
    console.log('Saved');
  },
  model: null,
  actions: {
    back: function () {
      return this.transitionTo(this.get('fallbackRoute'));
    },
    save: function () {
      let model = this.get("controller.model");
      model.validate().then(() => {
        if(model.get('validations.isValid')) {
          model.set('updatedAt', new Date());
          model.save().then(this.afterSave(model));
        }
      });
    }
  }
});
